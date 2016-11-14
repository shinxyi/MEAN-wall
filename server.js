var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    session  = require('express-session'),
    root     = __dirname,
    port     = process.env.PORT || 5000,
    app      = express();

require('./server/config/mongoose.js')

app.use(session({secret: 'ajsdkflwSecret9102'}));
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));

app.use(bp.json()); //make sure this comes before the routes or else json req.body
                    //will be undefined when it reaches our controllers!

require('./server/config/routes.js')(app);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
