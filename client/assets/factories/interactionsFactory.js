console.log('Interactions Factory');

app.factory('interactionsFactory', ['$http', '$cookies',  function($http, $cookies) {

  function InteractionsFactory(){

    var _this = this;

    this.message = function(msg, callback){
      if(!msg){
        return callback({errors: 'Message cannot be empty!'})
      }
      console.log('!!!! MADE IT TO TRYING TO CREATE MSG IN interxionFactory')
      console.log(msg);
      $http.post('/postMsg', msg).then(function(returned_data){
        callback(returned_data.data);
      })
    };

    this.addComment = function(postId, oneComment, callback){
      if(!oneComment.text){
        return callback({errors: 'Comment cannot be empty!'})
      }
      console.log('!!! TRYING TO POST COMMENT IN INTERX FACTORY');
      console.log(oneComment);
      $http.post('/comment/'+ postId , oneComment).then(function(returned_data){
        callback(returned_data.data);
      })
    };

    this.getWall = function(callback){
      $http.get('/getWall').then(function(returned_data){
        callback(returned_data.data.messages);
      });
    };

    this.logout = function(){
      $cookies.remove('user');
      $http.get('/logout').then();
    }

  }

  console.log(new InteractionsFactory());
  return new InteractionsFactory();

}]);
