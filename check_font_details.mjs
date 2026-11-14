import fs from 'fs';

const origHtml = fs.readFileSync('gate-rank-index.html', 'utf-8');
const origCss = fs.readFileSync('index.css', 'utf-8');
const customCss = fs.readFileSync('src/styles/gate-rank-original.css', 'utf-8');

console.log('--- Checking font links in HTML ---');
const fontLinks = origHtml.match(/<link[^>]*font[^>]*>/gi) || [];
console.log('Font links:', fontLinks);

// Check Google fonts or preloads
const preloads = origHtml.match(/<link[^>]*preload[^>]*>/gi) || [];
console.log('Preloads:', preloads);

console.log('\n--- Checking body/html font in CSS ---');
const bodyMatches = (origCss + '\n' + customCss).match(/(?:html|body|\*)\s*\{[^}]*font[^}]*\}/gi) || [];
console.log('Body/html font matches:');
bodyMatches.forEach(m => console.log(' ', m));

console.log('\n--- Checking font-family occurrences ---');
const fontFamilies = (origCss + '\n' + customCss).match(/font-family:\s*[^;}]+/gi) || [];
console.log(Array.from(new Set(fontFamilies)));

console.log('\n--- Checking home-v3 font sizes ---');
const homeV3FontSizes = customCss.match(/\.home-v3[^{]*\{[^}]*font-size:[^}]*\}/gi) || [];
homeV3FontSizes.slice(0, 20).forEach(m => console.log(' ', m));
