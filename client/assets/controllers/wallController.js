app.controller('wallController', ['$scope','interactionsFactory', 'usersFactory', '$location', '$cookies', function($scope, interactionsFactory, usersFactory, $location, $cookies) {
  console.log('CHECKING COOKIES !!!-')
  console.log($cookies.get('user'));

  if(!($cookies.get('user'))) {
    $location.url('/login');
  }

  $scope.username = $cookies.get('user');

  $scope.getWall = function(){
    interactionsFactory.getWall(function(returnedData){
      $scope.posts = returnedData;
      console.log('checking scope-----', $scope.commentText);
    })
  }

  $scope.getWall();

  $scope.logout = function(){
    usersFactory.logout();
    $location.url('/login');
  }

  $scope.message = function(){
    interactionsFactory.message($scope.postMsg, function(returnedData){
      if(returnedData.errors){
        $scope.errors = returnedData.errors;
      }else{
        $scope.errors = undefined;
        $scope.postMsg={};
        $scope.getWall();
      }
    })
  };

  $scope.comment = function(postId, commentText, index){
    console.log("?????", commentText);
    console.log(postId);
    var oneComment = { text: commentText }
    interactionsFactory.addComment(postId, oneComment, function(returnedData){
      if(returnedData.errors){
        $scope.errors2 = returnedData.errors;
        $scope.thisOne = index;
      }else{
        $scope.errors2 = undefined;
        // $scope.commentText=undefined;
        $scope.getWall();
      }
    })
  }

}]);
