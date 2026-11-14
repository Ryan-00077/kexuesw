import fs from 'fs';

const html = fs.readFileSync('apply.html', 'utf8');
const formIdx = html.indexOf('apply-form');
console.log(html.substring(formIdx - 200, formIdx + 1200));

