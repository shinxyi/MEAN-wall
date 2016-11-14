app.controller('wallController', ['$scope','usersFactory', '$location', '$cookies', function($scope, usersFactory, $location, $cookies) {
  console.log('CHECKING COOKIES !!!-')
  console.log($cookies.get('user'));

  if(!($cookies.get('user'))) {
    $location.url('/login');
  }
  //
  // if(!($cookies.get('access')) && (window.location.href.indexOf("secret") > -1)){
  //   $location.url('/secure');
  // }

  $scope.logout = function(){
    usersFactory.logout();
    $location.url('/login');
  }

  $scope.unlock = function(){

    $scope.info.email = $scope.user.email;

    usersFactory.login($scope.info, function(returnedData){
      if(returnedData.errors){
        $scope.errors = returnedData.errors;
      }else{
        $cookies.put('access', true);
        $location.url('/secret');
      }
    })
  };

  $scope.lock = function(){
    $cookies.remove('access');
    $location.url('/success');
  }

}]);
