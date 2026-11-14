import fs from 'fs';

const html = fs.readFileSync('gate-rank-index.html', 'utf-8');

const s = html.indexOf('class="home-v3-tools"');
if (s !== -1) {
  // Let's print 1000 chars before and 1500 chars after
  const start = Math.max(0, s - 1000);
  const end = Math.min(html.length, s + 1500);
  console.log(html.slice(start, end));
} else {
  console.log('Not found');
}

