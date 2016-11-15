console.log('routes');
var users = require('../controllers/users.js');
var interactions = require('../controllers/interactions.js');

module.exports = function(app){
  app.post('/reg', users.create);
  app.post('/login', users.login);
  app.get('/logout', users.logout);

  app.post('/postMsg', interactions.message);
  app.post('/comment/:postId', interactions.comment);
  app.get('/getWall', interactions.getWall);
}
