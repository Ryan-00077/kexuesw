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

// Print pixel brightness map as ASCII art!
console.log('ASCII Map of logo (width: ' + width + ', height: ' + height + '):');
for (let y = 0; y < height; y += 4) {
  let line = '';
  for (let x = 0; x < width; x += 2) {
    const idx = (y * width + x) * 4;
    const br = (rawPixels[idx] + rawPixels[idx + 1] + rawPixels[idx + 2]) / 3;
    if (br > 200) line += '#';
    else if (br > 100) line += '+';
    else if (br > 40) line += '.';
    else line += ' ';
  }
  console.log(line);
}

