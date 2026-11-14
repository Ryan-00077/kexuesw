import fs from 'fs';

const css = fs.readFileSync('src/styles/apply-page.css', 'utf8');
console.log('--- Lines count:', css.split('\n').length);
console.log(css);

