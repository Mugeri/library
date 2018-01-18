const app = require('express')();
const router = require('./server/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

mongoose.connect('mongodb://riwhiz:library@ds159953.mlab.com:59953/library');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

router(app);

const twitterConfig = {
  consumer_key: process.env.Consumer_Key,
  consumer_secret: process.env.Consumer_Secret,
  access_token_key: process.env.Access_Token,
  access_token_secret: process.env.Access_Token_Secret,
}


app.listen('8080', () => {
  console.log();
  console.log(
    ` ${chalk.bold('listening on port 8080')}`
  );
  console.log();
});

module.exports = app;
