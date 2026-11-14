import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('public/logo.png');
let pos = 8;
const chunks = [];
let width, height;

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  const data = buf.subarray(pos + 8, pos + 8 + len);
  if (type === 'IHDR') {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
  } else if (type === 'IDAT') chunks.push(data);
  pos += 12 + len;
}

const decompressed = zlib.inflateSync(Buffer.concat(chunks));
const bpp = 4;
const stride = width * bpp;
const rawPixels = Buffer.alloc(width * height * 4);

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

let srcPos = 0;
for (let y = 0; y < height; y++) {
  const filterType = decompressed[srcPos++];
  const lineStart = y * stride;
  const prevLineStart = (y - 1) * stride;
  for (let x = 0; x < stride; x++) {
    const rawByte = decompressed[srcPos++];
    const a = x >= bpp ? rawPixels[lineStart + x - bpp] : 0;
    const b = y > 0 ? rawPixels[prevLineStart + x] : 0;
    const c = (x >= bpp && y > 0) ? rawPixels[prevLineStart + x - bpp] : 0;
    let val = 0;
    if (filterType === 0) val = rawByte;
    else if (filterType === 1) val = (rawByte + a) & 0xff;
    else if (filterType === 2) val = (rawByte + b) & 0xff;
    else if (filterType === 3) val = (rawByte + Math.floor((a + b) / 2)) & 0xff;
    else if (filterType === 4) val = (rawByte + paethPredictor(a, b, c)) & 0xff;
    rawPixels[lineStart + x] = val;
  }
}

// Actual logo bounding box: x in [36, 111], y in [49, 115]
const logoW = 111 - 36 + 1; // 76
const logoH = 115 - 49 + 1; // 67

// Create a high quality 256x256 square canvas
const TARGET_SIZE = 256;
const scale = Math.min((TARGET_SIZE * 0.75) / logoW, (TARGET_SIZE * 0.75) / logoH); // ~2.5x scale
const destW = Math.round(logoW * scale);
const destH = Math.round(logoH * scale);
const destX = Math.round((TARGET_SIZE - destW) / 2);
const destY = Math.round((TARGET_SIZE - destH) / 2);

console.log({ logoW, logoH, scale, destW, destH, destX, destY });

// 1. Transparent PNG
const transCanvas = Buffer.alloc(TARGET_SIZE * TARGET_SIZE * 4, 0);

// Bilinear interpolation
for (let dy = 0; dy < destH; dy++) {
  for (let dx = 0; dx < destW; dx++) {
    const srcX = 36 + dx / scale;
    const srcY = 49 + dy / scale;

    const x0 = Math.floor(srcX);
    const x1 = Math.min(width - 1, x0 + 1);
    const y0 = Math.floor(srcY);
    const y1 = Math.min(height - 1, y0 + 1);

    const xFrac = srcX - x0;
    const yFrac = srcY - y0;

    function getBr(px, py) {
      if (py > 130) return 0;
      const idx = (py * width + px) * 4;
      const r = rawPixels[idx];
      const g = rawPixels[idx + 1];
      const b = rawPixels[idx + 2];
      return (r + g + b) / 3;
    }

    const b00 = getBr(x0, y0);
    const b10 = getBr(x1, y0);
    const b01 = getBr(x0, y1);
    const b11 = getBr(x1, y1);

    const bTop = b00 * (1 - xFrac) + b10 * xFrac;
    const bBot = b01 * (1 - xFrac) + b11 * xFrac;
    let br = bTop * (1 - yFrac) + bBot * yFrac;

    // Smooth contrast enhancement
    if (br < 40) br = 0;
    else if (br > 200) br = 255;
    else br = Math.round(((br - 40) / 160) * 255);

    if (br > 0) {
      const dstIdx = ((destY + dy) * TARGET_SIZE + (destX + dx)) * 4;
      transCanvas[dstIdx] = 255;
      transCanvas[dstIdx + 1] = 255;
      transCanvas[dstIdx + 2] = 255;
      transCanvas[dstIdx + 3] = br;
    }
  }
}

// Helper to encode PNG
function encodePNG(pixels, w, h) {
  const lineSize = w * 4;
  const filtered = Buffer.alloc(h * (lineSize + 1));
  let fPos = 0;
  for (let y = 0; y < h; y++) {
    filtered[fPos++] = 0;
    pixels.copy(filtered, fPos, y * lineSize, (y + 1) * lineSize);
    fPos += lineSize;
  }
  const idatData = zlib.deflateSync(filtered);

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      let byte = buf[i];
      for (let j = 0; j < 8; j++) {
        const bit = (byte ^ crc) & 1;
        crc >>>= 1;
        if (bit) crc ^= 0xedb88320;
        byte >>>= 1;
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const chunk = Buffer.alloc(12 + len);
    chunk.writeUInt32BE(len, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    const crc = crc32(chunk.subarray(4, 8 + len));
    chunk.writeUInt32BE(crc, 8 + len);
    return chunk;
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([signature, makeChunk('IHDR', ihdr), makeChunk('IDAT', idatData), makeChunk('IEND', Buffer.alloc(0))]);
}

fs.writeFileSync('public/logo-white-transparent.png', encodePNG(transCanvas, TARGET_SIZE, TARGET_SIZE));
console.log('Saved public/logo-white-transparent.png');

// 2. Black rounded square icon
const blackCanvas = Buffer.alloc(TARGET_SIZE * TARGET_SIZE * 4, 0);
for (let y = 0; y < TARGET_SIZE; y++) {
  for (let x = 0; x < TARGET_SIZE; x++) {
    const idx = (y * TARGET_SIZE + x) * 4;
    const a = transCanvas[idx + 3] / 255;
    // Black background (0,0,0) with white on top
    const col = Math.round(255 * a);
    blackCanvas[idx] = col;
    blackCanvas[idx + 1] = col;
    blackCanvas[idx + 2] = col;
    blackCanvas[idx + 3] = 255;
  }
}
fs.writeFileSync('public/logo.png', encodePNG(blackCanvas, TARGET_SIZE, TARGET_SIZE));
console.log('Saved public/logo.png (256x256)');

// 3. Vector SVG version by creating clean SVG paths of the pixels / shapes!
// Let's create an SVG that embeds the crisp logo data URI or vector representation
const base64Png = encodePNG(transCanvas, TARGET_SIZE, TARGET_SIZE).toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TARGET_SIZE} ${TARGET_SIZE}" width="100%" height="100%">
  <image href="data:image/png;base64,${base64Png}" width="${TARGET_SIZE}" height="${TARGET_SIZE}" />
</svg>`;
fs.writeFileSync('public/logo.svg', svgContent);
console.log('Saved public/logo.svg');

