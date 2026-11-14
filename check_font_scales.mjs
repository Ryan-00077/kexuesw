import fs from 'fs';

const origHtml = fs.readFileSync('gate-rank-index.html', 'utf8');
const origCss = fs.readFileSync('index.css', 'utf8');
const customCss = fs.readFileSync('src/styles/gate-rank-original.css', 'utf8');

// Check all font-family definitions in customCss
const ffMatches = customCss.match(/font-family:[^;}]+/g) || [];
console.log('customCss font-families:', [...new Set(ffMatches)]);

// Check all font-size definitions in customCss
const fsMatches = customCss.match(/font-size:[^;}]+/g) || [];
console.log('customCss font-sizes count:', fsMatches.length);
console.log('customCss unique font-sizes:', [...new Set(fsMatches)].sort());
