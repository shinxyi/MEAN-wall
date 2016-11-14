console.log('friends model');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var userSchema = new mongoose.Schema({
 email: {
        type: String,
        required: [true, "Email is Required!"],
        unique: [true, "Email is already in use!"],
        validate: {
          validator: function( value ) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( value );
          },
          message: "Email is not in the proper format: example@example.com"
        }
      },
 username: {
           type: String,
           unique: [true, "Username is already taken!"], //apparently queries to mongodb is case sensitive
           maxlength: [20, "Your username may not be longer than 20 characters!"],
           required: [true, "Username is Required!"],
           trim: true,
           validate: {
             validator: function( value ) {
               return /^[a-zA-Z0-9_]*$/.test( value );
             },
             message: "Username can only contain alphanumeric characters and underscores."
           }
         },
 password: {
        type: String,
        required: [true, "Password is Required!"],
        minlength: [8, "Your password must be at least 8 characters long"],
        maxlength: [32, "Your password may not be more than 32 characters"],
        validate: {
          validator: function( value ) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
          },
          message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
      }
},{ timestamps: true});

userSchema.methods.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

userSchema.pre('save', function(done){
  this.password = this.encrypt(this.password);
  done();
});

var User = mongoose.model('User', userSchema); // We are setting this Schema in our Models as 'User'
