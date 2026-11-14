import fs from 'fs';

const html = fs.readFileSync('gate-rank-index.html', 'utf8');

const tableStart = html.indexOf('<div class="home-v3-table-wrap">');
const tableEnd = html.indexOf('</table>', tableStart);
console.log(html.substring(tableStart, tableEnd + 8));
