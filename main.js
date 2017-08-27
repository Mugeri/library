const app = require('express')();
const router = require('./server/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://riwhiz:library@ds159953.mlab.com:59953/library');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

router(app);

app.listen('8080', () => {
  console.log();
  console.log(
    ` ${chalk.bold('listening on port 8080')}`
  );
  console.log();
});

module.exports = app;
