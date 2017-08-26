const user = require('../controllers/user');
const book = require('../controllers/book');

const router = (app) => {
  app.post('api/user/', user.create);
  app.post('api/book/', book.create);
  app.get('api/user/', user.read);
  app.get('api/book/', book.read);
  app.put('api/user/', user.update);
  app.put('api/book/', book.update);
  app.delete('api/user/', user.delete);
  app.delete('api/book/', book.delete);
}

module.exports = router;
