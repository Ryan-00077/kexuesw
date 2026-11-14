import fs from 'fs';

const html = fs.readFileSync('gate-rank-index.html', 'utf8');
const css = fs.readFileSync('index.css', 'utf8');

console.log('HTML font files:', html.match(/[^\s"']+\.(?:woff2?|ttf|otf)/gi));
console.log('CSS font files:', css.match(/[^\s"']+\.(?:woff2?|ttf|otf)/gi));

// Check any font-family or typography settings
const fontMatches = css.match(/font-family:[^;}]+/g);
console.log('CSS unique font-family:', Array.from(new Set(fontMatches)));

// Check index.html vs gate-rank-index.html html/body tags
const bodyTag = html.match(/<body[^>]*>/i);
console.log('Original body tag:', bodyTag);

const htmlTag = html.match(/<html[^>]*>/i);
console.log('Original html tag:', htmlTag);
