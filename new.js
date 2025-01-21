const http = require('http');  // Declare 'http' only once
const url = require('url');    // You can keep this
const { parse } = require('querystring');  // You can keep this as well

// Create a server to handle requests
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  // Handle GET request to /hello
  if (method === 'GET' && parsedUrl.pathname === '/hello') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
  }

  // Handle POST request to /data
  else if (method === 'POST' && parsedUrl.pathname === '/data') {
    let body = '';
    
    // Collect data from the request body
    req.on('data', chunk => {
      body += chunk;
    });
    
    // Parse the data and respond
    req.on('end', () => {
      try {
        const parsedData = JSON.parse(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsedData));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
      }
    });
  }

  // If no matching endpoint
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
