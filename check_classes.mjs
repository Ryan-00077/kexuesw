import fs from 'fs';

const origHtml = fs.readFileSync('gate-rank-index.html', 'utf8');

// Check class names in origHtml vs our components
const origClasses = new Set(origHtml.match(/class="([^"]+)"/g)?.map(m => m.replace(/class="|"$/g, '').split(/\s+/)).flat());

console.log('Total unique classes in original HTML:', origClasses.size);

// Print all home-v3 classes
const homeClasses = [...origClasses].filter(c => c.startsWith('home-v3'));
console.log('home-v3 classes in original HTML:', homeClasses);
