import fs from 'fs';

const html = fs.readFileSync('gate-rank-index.html', 'utf8');

// Find all section tags and their classes
const sections = html.match(/<section[^>]*>/gi);
console.log('Sections:', sections);

// Find main class
const mainMatch = html.match(/<main[^>]*>/gi);
console.log('Main:', mainMatch);

// Find hero
const heroMatch = html.match(/<div class="home-v3-hero"[^>]*>([\s\S]*?)<\/div>/i);
if (heroMatch) {
  console.log('Hero inner length:', heroMatch[1].length);
}
