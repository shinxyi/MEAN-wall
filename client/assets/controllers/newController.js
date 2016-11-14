app.controller('newController', ['$scope','usersFactory', '$location', '$cookies', function($scope, usersFactory, $location, $cookies) {

  console.log('CHECKING COOKIES vvv')
  console.log($cookies.get('user'));

  if($cookies.get('user')){
    $location.url('/success');
  }

  $scope.reg = function(){
    usersFactory.create($scope.info, function(returnedData){
      if(returnedData.errors){
        $scope.errors = returnedData.errors;
      }else{
        $location.url('/success');
      }
    })
  };

  $scope.login = function(){
    usersFactory.login($scope.info, function(returnedData){
      if(returnedData.errors){
        $scope.errors = returnedData.errors;
      }else{
        $location.url('/success');
      }
    })
  };

}]);
