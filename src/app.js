const express = require('express');
const mongoose = require('mongoose');
const route = require('./api/routes/product.routes');
const app = express();
async function connect() {
    try {
      await mongoose.connect('mongodb+srv://wdsteambe2003:123abc456@wdsdatabase.i3up3zz.mongodb.net/website');
      console.log('connect success')
    } catch (error) {
      console.log('connect failure')
    }
}
connect();
route(app);
app.listen(3000);

module.exports = app;