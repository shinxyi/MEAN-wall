app.controller('newController', ['$scope','usersFactory', '$location', '$cookies', function($scope, usersFactory, $location, $cookies) {

  console.log('CHECKING COOKIES vvv')
  console.log(typeof $cookies.get('user'));

  // if($cookies.get('user')){
  //   $location.url('/wall');
  // }

  $scope.reg = function(){
    console.log($scope.info);
    usersFactory.create($scope.info, function(returnedData){
      if(returnedData.errors){
        $scope.errors = returnedData.errors;
      }else{
        $location.url('/wall');
      }
    })
  };

  $scope.login = function(){
    usersFactory.login($scope.info, function(returnedData){
      if(returnedData.errors){
        $scope.errors = returnedData.errors;
      }else{
        $location.url('/wall');
      }
    })
  };

}]);
