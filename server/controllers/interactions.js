var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Post = mongoose.model('Post');

console.log('interactions controller');

function InteractionsController(){

  this.message = function(req,res){
    console.log(req.session);
    console.log('------msg is being created!!!', req.body.text,req.session.user.username);

    var post = new Post({text: req.body.text, username: req.session.user.username});
    post.save(function(err, post){
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
        console.log(post);
        res.json(post);
      }
    })
  };

  this.comment= function(req,res){
    Post.findOne({_id: req.params.postId}, function(err, post){
      if(err){
        res.json({errors: "Post message not found."});
      }else{
        var comment = new Comment({text: req.body.text, username:req.session.user.username});
        comment._post = req.params.postId;

        comment.save(function(err){
          post.comments.push(comment);
          post.save(function(err){
            if(err){
              res.json({errors: "Failed to save comment to DB"});
            }else{
              res.json(comment);
            }
          })
        })
      }
    })
  };

  this.getWall = function(req,res){

    Post.find({})
    .populate('comments')
    .exec(function(err, messages){
      if(err){
        res.json({errors: 'Cannot get messages.'});
      }else{
        res.json({messages: messages});
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

module.exports = new InteractionsController();
