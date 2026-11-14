import fs from 'fs';

const origHtml = fs.readFileSync('gate-rank-index.html', 'utf8');

function checkComponent(name, filePath, origStartStr, origEndStr) {
  const compCode = fs.readFileSync(filePath, 'utf8');
  const startIdx = origHtml.indexOf(origStartStr);
  const endIdx = origHtml.indexOf(origEndStr, startIdx);
  const origSnippet = origHtml.substring(startIdx, endIdx + origEndStr.length);
  
  console.log(`\n=================== ${name} ===================`);
  console.log(`Original snippet length: ${origSnippet.length}`);
  console.log(`Component length: ${compCode.length}`);
}

checkComponent('NewsSection', 'src/components/NewsSection.jsx', '<section id="announcement-dynamics-section"', '</section>');
checkComponent('CrossAnalysisSection', 'src/components/CrossAnalysisSection.jsx', '<section aria-labelledby="home-v3-summary-title">', '</section>');
checkComponent('TrustSection', 'src/components/TrustSection.jsx', '<section class="home-v3-trust"', '</section>');
checkComponent('FaqSection', 'src/components/FaqSection.jsx', '<section class="home-v3-faq"', '</section>');
checkComponent('Footer', 'src/components/Footer.jsx', '<footer class="footer">', '</footer>');
