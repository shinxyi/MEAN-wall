console.log('message model');
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
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
 comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
},{ timestamps: true});


var Post = mongoose.model('Post', postSchema);
