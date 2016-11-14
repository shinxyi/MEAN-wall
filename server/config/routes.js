console.log('routes');
var users = require('../controllers/users.js');

module.exports = function(app){
  app.post('/reg', users.create);
  app.post('/login', users.login);
  app.get('/logout', users.logout);
}
