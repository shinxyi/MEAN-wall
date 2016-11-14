var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

console.log('users controller');

function UsersController(){

  this.create = function(req,res){

    console.log('user is being created!!!', req.body);

    var user = new User(req.body);
    user.save(function(err, user){
      if(err){
        var errors = [];

        for(var key in err.errors){
          errors.push(err.errors[key].message);
        }

        if(err.errmsg){
          errors.push("Something went wrong...");
        }
        console.log(errors);

        res.json({errors: errors});

      }else{
        req.session.user= user; //saves logged-in user info
        console.log('SESSION USER INFO');
        console.log(req.session.user);
        res.json(user);
      }
    })
  };

  this.login = function(req,res){
    console.log('TRYING TO LOG IN')
    console.log(req.body);

    User.findOne({email: req.body.email }, function(err, user){
      var errors = [];

      if(err){
        errors.push('Please check your email/password combination.');
        res.json({errors: errors});
      }else if(!user){
        errors.push('Please check your email/password combination.');
        res.json({errors: errors});
      }else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          req.session.user= user; //saves logged-in user info
          console.log('SESSION USER INFO');
          console.log(req.session.user);
          res.json(user);
        }else{
          errors.push('Please check your email/password combination.');
          res.json({errors: errors});
        }
      }
    })
  };

  this.logout = function(req, res){
    req.session.user= null;
    console.log('SESSION USER INFO');
    console.log(req.session.user);
    res.json({message: 'logged out'});
  }
}

module.exports = new UsersController();
