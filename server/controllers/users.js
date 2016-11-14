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
          console.log(err.errors[key].message);
        }

        if(err.errmsg){
          errors.push("Something went wrong...");
          console.log(err.errmsg);
        }

        res.json({errors: errors});

      }else{
        res.json(user);
      }
    })
  };

  this.login = function(req,res){
    console.log('TRYING TO LOG IN')
    console.log(req.body);
    var errors = [];

    User.findOne({email: req.body.email }, function(err, user){
      if(err){
        errors.push('Please check your email/password combination.');
        res.json({errors: errors});
      }else if(!user){
        errors.push('Please check your email/password combination.');
        res.json({errors: errors});
      }else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          res.json(user);
        }else{
          errors.push('Please check your email/password combination.');
          res.json({errors: errors});
        }
      }
    })
  };
}

module.exports = new UsersController();
