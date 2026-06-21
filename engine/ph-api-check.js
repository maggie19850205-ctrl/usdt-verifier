const https = require('https');

// Check PH GraphQL API accessibility
const q = JSON.stringify({
  query: 'mutation { createPost(input: {name: "test" tagline: "test" url: "https://test.com" description: "test"}) { post { id name } } }'
});

const req = https.request({
  hostname: 'api.producthunt.com',
  path: '/v2/api/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(q)
  }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('PH API status:', res.statusCode);
    console.log('Response:', d.substring(0, 500));
  });
});
req.on('error', e => console.log('Error:', e.message));
req.write(q);
req.end();
