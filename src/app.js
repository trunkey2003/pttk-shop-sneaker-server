const express = require('express');
// const router = express.Router();
const routes = require('./api/routes/index.js');
const app = express();
app.use('/', routes);

app.listen(3000);

module.exports = app;