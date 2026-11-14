import fs from 'fs';

const html = fs.readFileSync('gate-rank-index.html', 'utf8');

const mainStart = html.indexOf('<main class="home-v3">');
const mainEnd = html.indexOf('</main>', mainStart);
const mainHtml = html.substring(mainStart, mainEnd + 7);

console.log('Main HTML length:', mainHtml.length);

// Find top level children inside main
// Let's print out lines matching <div class="home-v3 or <section
const tags = mainHtml.match(/<(?:section|div|aside|header)[^>]*class="home-v3[^"]*"[^>]*>/g);
console.log('Home-v3 tags:', tags);
