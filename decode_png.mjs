import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('public/logo.png');

// Find IDAT chunks
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
    console.log({ width, height, bitDepth, colorType });
  } else if (type === 'IDAT') {
    chunks.push(data);
  }
  pos += 12 + len;
}

const compressed = Buffer.concat(chunks);
const decompressed = zlib.inflateSync(compressed);
console.log('Decompressed length:', decompressed.length);

// Let's decode scanlines
// colorType 2 = RGB (3 bytes per pixel), colorType 6 = RGBA (4 bytes), colorType 0 = Grayscale (1 byte)
let bytesPerPixel = 3;
if (colorType === 6) bytesPerPixel = 4;
if (colorType === 0) bytesPerPixel = 1;
if (colorType === 4) bytesPerPixel = 2;

console.log('Bytes per pixel:', bytesPerPixel);

