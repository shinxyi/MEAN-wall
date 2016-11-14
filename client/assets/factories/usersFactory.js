console.log('Users Factory');

app.factory('usersFactory', ['$http', '$cookies',  function($http, $cookies) {

  var users = [];
  var users = {};

  function UsersFactory(){

    var _this = this;

    this.create = function(user, callback){
      console.log('!!!! MADE IT TO TRYING TO CREATE USER IN usersFactory')
      if(!user){
        callback({errors: ['Fields cannot be empty!!']});
      }else if(user.password != user.password2){
        callback({errors: ['Passwords do not match!']});
      }else{
        $http.post('/reg', user).then(function(returned_data){
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          $cookies.put('user', true , {'expires': expireDate});
          callback(returned_data.data);
        })
      }
    };

    this.login = function(user, callback){
      if(!user||!(user.hasOwnProperty('email'))){
        callback({errors: ['Fields cannot be empty!']});
      }else{
        $http.post('/login', user).then(function(returned_data){
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          $cookies.put('user', true , {'expires': expireDate});
          callback(returned_data.data);
        });
      }
    };

    this.logout = function(){
      $cookies.remove('user');
      $http.get('/logout').then();
    }

  }

  console.log(new UsersFactory());
  return new UsersFactory();

}]);
