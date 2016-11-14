console.log('message model');
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
 name: {
           type: String,
           required: [true, "Name is Required!"],
           trim: true
         },
 text: {
           type: String,
           required: [true, "Message is Required!"],
           trim: true
         },
 // _post: {type: Post.Types.ObjectID, ref: 'Post'}
},{ timestamps: true});


var Comment = mongoose.model('Comment', commentSchema);

console.log('message model');
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
 name: {
           type: String,
           required: [true, "Name is Required!"],
           trim: true
         },
 text: {
           type: String,
           required: [true, "Message is Required!"],
           trim: true
         },
 // comments: [{type: Comment.Types.ObjectID, ref: 'Comment'}]
},{ timestamps: true});


var Post = mongoose.model('Post', postSchema);
