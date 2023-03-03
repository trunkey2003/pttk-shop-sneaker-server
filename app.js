const express = require('express');

var app = express();
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Tutorial!');
});
module.exports=app;