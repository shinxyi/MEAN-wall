var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 5000,
    // bcrypt   = require('bcrypt'),
    app      = express();

require('./server/config/mongoose.js')

app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));

app.use(bp.json()); //make sure this comes before the routes or else json req.body
                    //will be undefined when it reaches our controllers!

require('./server/config/routes.js')(app);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
