import fs from 'fs';

const html = fs.readFileSync('apply.html', 'utf8');
const formIdx = html.indexOf('apply-form-title');
console.log(html.substring(formIdx, formIdx + 2000));

