const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');

require('dotenv').config();
require('./db/database');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

if(!module.parent){
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });
}

module.exports = app