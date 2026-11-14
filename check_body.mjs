import fs from 'fs';

const html = fs.readFileSync('gate-rank-index.html', 'utf8');

// Find the body contents opening
const bodyIdx = html.indexOf('<body>');
console.log('Body start:', html.substring(bodyIdx, bodyIdx + 1500));
