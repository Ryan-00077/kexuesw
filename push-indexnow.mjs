import https from 'https';

const API_KEY = 'd9ef7a3a7097d12a5608bb120323d12d';
const HOST = process.argv[2] || 'kexuesw.com';

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/rankings`,
  `https://${HOST}/deals`,
  `https://${HOST}/tools`,
  `https://${HOST}/news`,
  `https://${HOST}/methodology`,
  `https://${HOST}/risk-monitor`,
  `https://${HOST}/apply`,
  `https://${HOST}/airports/shenxing`,
  `https://${HOST}/airports/dalaoyun`,
  `https://${HOST}/airports/yunjiexian`,
  `https://${HOST}/airports/liulianyun`,
  `https://${HOST}/airports/shandianshu`,
  `https://${HOST}/airports/huanqiuti`
];

const payload = JSON.stringify({
  host: HOST,
  key: API_KEY,
  keyLocation: `https://${HOST}/${API_KEY}.txt`,
  urlList: URLS
});

console.log(`Submitting ${URLS.length} URLs to IndexNow for host: ${HOST}...`);

const endpoints = [
  'api.indexnow.org',
  'www.bing.com'
];

endpoints.forEach(endpoint => {
  const req = https.request({
    hostname: endpoint,
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log(`[${endpoint}] Response HTTP Status: ${res.statusCode} ${res.statusMessage}`);
      if (body) {
        console.log(`[${endpoint}] Body:`, body);
      }
      if (res.statusCode === 200) {
        console.log(`[${endpoint}] Success: URLs submitted successfully.`);
      } else if (res.statusCode === 202) {
        console.log(`[${endpoint}] Accepted: URLs submitted successfully, key verification pending.`);
      } else if (res.statusCode === 403) {
        console.log(`[${endpoint}] Notice: Key not verified yet. Ensure https://${HOST}/${API_KEY}.txt is live and reachable.`);
      }
    });
  });

  req.on('error', (err) => {
    console.error(`[${endpoint}] Request Error:`, err.message);
  });

  req.write(payload);
  req.end();
});
