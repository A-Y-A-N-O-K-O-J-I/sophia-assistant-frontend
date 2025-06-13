const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "auth" folder
app.use('/auth', express.static(path.join(__dirname, 'auth')));

app.listen(3000, '0.0.0.0', () => {
  console.log('Running at http://localhost:3000/auth/login.html');
});
