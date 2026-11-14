import fs from 'fs';

const js = fs.readFileSync('index.js', 'utf8');

const regex = /.{0,50}(?:Inter|font-family).{0,50}/g;
let match;
let count = 0;
while ((match = regex.exec(js)) !== null && count < 10) {
  console.log(count + 1 + ': ' + match[0]);
  count++;
}
