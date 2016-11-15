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
      console.log('GET WALL -----', returnedData)
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
        $scope.getWall();
        $scope.postMsg={};
      }
    })
  };

  $scope.comment = function(postId){
    console.log("?????", $scope.oneComment)
    console.log(postId);
    interactionsFactory.addComment($scope.oneComment, postId, function(returnedData){
      if(returnedData.errors){
        $scope.errors = returnedData.errors;
      }else{
        $scope.getWall();
        $scope.oneComment={};
      }
    })
  }

}]);
