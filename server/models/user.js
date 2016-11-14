console.log('friends model');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var userSchema = new mongoose.Schema({
 bday: {
        type: Date,
        required: [true, "Birthday is Required!"],
        validate: {
          validator: function (value){
            return new Date(value) <  new Date();
          },
          message: "You must be at least one day old!"
        }
 },
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
 fname: {
           type: String,
           required: [true, "First Name is Required!"],
           trim: true
         },
 lname: {
           type: String,
           required: [true, "Last Name is Required!"],
           trim: true
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
