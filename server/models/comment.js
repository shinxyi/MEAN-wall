console.log('comment model');
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
 username: {
           type: String,
           required: [true, "Name is Required!"],
           trim: true
         },
 text: {
           type: String,
           required: [true, "Message is Required!"],
           trim: true
         },
 _post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
},{ timestamps: true});


var Comment = mongoose.model('Comment', commentSchema);
