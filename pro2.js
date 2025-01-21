const http = require('http');
const url = require('url');
const { parse } = require('querystring');

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const { pathname } = parsedUrl;

  // Handle GET /users - Return all users
  if (method === 'GET' && pathname === '/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }

  // Handle POST /users - Add a new user
  else if (method === 'POST' && pathname === '/users') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const newUser = JSON.parse(body);
        newUser.id = users.length + 1;  // Set the new user ID based on the current length
        users.push(newUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON data');
      }
    });
  }

  // Handle PUT /users/:id - Update a user's details
  else if (method === 'PUT' && pathname.startsWith('/users/')) {
    const id = parseInt(pathname.split('/')[2]);

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const updatedUser = JSON.parse(body);
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('User not found');
          return;
        }

        users[userIndex] = { id, ...updatedUser };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users[userIndex]));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON data');
      }
    });
  }

  // Handle DELETE /users/:id - Remove a user
  else if (method === 'DELETE' && pathname.startsWith('/users/')) {
    const id = parseInt(pathname.split('/')[2]);
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('User not found');
      return;
    }

    users.splice(userIndex, 1);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('User deleted');
  }

  // If no matching endpoint
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
