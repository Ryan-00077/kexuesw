import fs from 'fs';

const origHtml = fs.readFileSync('gate-rank-index.html', 'utf8');

function printOrig(startStr, endStr) {
  const s = origHtml.indexOf(startStr);
  const e = origHtml.indexOf(endStr, s);
  console.log(origHtml.substring(s, e + endStr.length));
}

console.log('--- TRUST SECTION ---');
printOrig('<section class="home-v3-trust"', '</section>');

console.log('\n--- FOOTER ---');
printOrig('<footer class="footer">', '</footer>');
