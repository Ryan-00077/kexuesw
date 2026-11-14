import fs from 'fs';

const html = fs.readFileSync('gate-rank-index.html', 'utf8');

function extractBetween(startStr, endStr) {
  const s = html.indexOf(startStr);
  if (s === -1) return null;
  const e = html.indexOf(endStr, s);
  if (e === -1) return null;
  return html.substring(s, e + endStr.length);
}

const hero = extractBetween('<section class="home-v3-hero">', '</section>');
console.log('=== HERO ===');
console.log(hero);

const ranking = extractBetween('<section class="home-v3-ranking"', '</section>');
console.log('=== RANKING (first 500 chars) ===');
console.log(ranking ? ranking.slice(0, 500) : null);

const explore = extractBetween('<section class="home-v3-explore">', '</section>');
console.log('=== EXPLORE ===');
console.log(explore);

const sponsored = extractBetween('<section class="home-v3-sponsored"', '</section>');
console.log('=== SPONSORED (first 500 chars) ===');
console.log(sponsored ? sponsored.slice(0, 500) : null);

const tools = extractBetween('<span>Quick tools</span>', '</section>');
console.log('=== TOOLS (first 500 chars) ===');
console.log(tools ? tools.slice(0, 500) : null);
