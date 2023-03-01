const express = require('express');
// const router = express.Router();
const routes = require('./routes/index.js');
const app = express();
app.use('/', routes);
module.exports = app;