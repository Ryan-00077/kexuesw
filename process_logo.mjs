import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('public/logo.png');

let pos = 8;
const chunks = [];
let width, height, bitDepth, colorType;

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  const data = buf.subarray(pos + 8, pos + 8 + len);
  
  if (type === 'IHDR') {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    bitDepth = data[8];
    colorType = data[9];
  } else if (type === 'IDAT') {
    chunks.push(data);
  }
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

// Now let's inspect the pixels and make black transparent
// A pixel is white if r > 100, g > 100, b > 100
// A pixel is black background if r < 50, g < 50, b < 50
const transparentPixels = Buffer.from(rawPixels);
let minX = width, maxX = 0, minY = height, maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = transparentPixels[idx];
    const g = transparentPixels[idx + 1];
    const b = transparentPixels[idx + 2];
    
    // Check brightness
    const brightness = (r + g + b) / 3;
    if (brightness > 60) {
      // It's the white logo!
      // Scale alpha based on brightness to get smooth antialiased edges
      transparentPixels[idx] = 255;
      transparentPixels[idx + 1] = 255;
      transparentPixels[idx + 2] = 255;
      transparentPixels[idx + 3] = Math.min(255, Math.floor((brightness / 255) * 255));
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else {
      // Transparent background
      transparentPixels[idx] = 0;
      transparentPixels[idx + 1] = 0;
      transparentPixels[idx + 2] = 0;
      transparentPixels[idx + 3] = 0;
    }
  }
}

console.log('Bounding box of white logo:', { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY });

// Helper to encode a PNG
function encodePNG(pixels, w, h) {
  // We can write no-filter scanlines
  const lineSize = w * 4;
  const filtered = Buffer.alloc(h * (lineSize + 1));
  let fPos = 0;
  for (let y = 0; y < h; y++) {
    filtered[fPos++] = 0; // Filter 0
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
  ihdr[8] = 8; // 8 bit
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // deflated
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // no interlace

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const transparentPng = encodePNG(transparentPixels, width, height);
fs.writeFileSync('public/logo-transparent.png', transparentPng);
console.log('Saved public/logo-transparent.png');

// Also crop to bounding box + small padding for perfect square icon
const pad = 8;
const cropMinX = Math.max(0, minX - pad);
const cropMaxX = Math.min(width - 1, maxX + pad);
const cropMinY = Math.max(0, minY - pad);
const cropMaxY = Math.min(height - 1, maxY + pad);
const cropW = cropMaxX - cropMinX + 1;
const cropH = cropMaxY - cropMinY + 1;

// Make it square
const maxDim = Math.max(cropW, cropH);
const sqPixels = Buffer.alloc(maxDim * maxDim * 4, 0);
const offsetX = Math.floor((maxDim - cropW) / 2);
const offsetY = Math.floor((maxDim - cropH) / 2);

for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = ((cropMinY + y) * width + (cropMinX + x)) * 4;
    const dstIdx = ((offsetY + y) * maxDim + (offsetX + x)) * 4;
    sqPixels[dstIdx] = transparentPixels[srcIdx];
    sqPixels[dstIdx + 1] = transparentPixels[srcIdx + 1];
    sqPixels[dstIdx + 2] = transparentPixels[srcIdx + 2];
    sqPixels[dstIdx + 3] = transparentPixels[srcIdx + 3];
  }
}

const squarePng = encodePNG(sqPixels, maxDim, maxDim);
fs.writeFileSync('public/logo-icon.png', squarePng);
console.log('Saved public/logo-icon.png (' + maxDim + 'x' + maxDim + ')');

// Also make a version on black rounded square for favicon / brand icon
const bgPixels = Buffer.alloc(maxDim * maxDim * 4, 0);
for (let y = 0; y < maxDim; y++) {
  for (let x = 0; x < maxDim; x++) {
    const idx = (y * maxDim + x) * 4;
    const alpha = sqPixels[idx + 3] / 255;
    // Black background with white logo on top
    bgPixels[idx] = Math.round(255 * alpha);
    bgPixels[idx + 1] = Math.round(255 * alpha);
    bgPixels[idx + 2] = Math.round(255 * alpha);
    bgPixels[idx + 3] = 255;
  }
}
const blackPng = encodePNG(bgPixels, maxDim, maxDim);
fs.writeFileSync('public/logo-black.png', blackPng);
console.log('Saved public/logo-black.png');

