const app = require('express')();
const router = require('./server/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

router(app);

app.listen('8080', () => {
  console.log('listening on port 8080');
});

module.exports = app;
