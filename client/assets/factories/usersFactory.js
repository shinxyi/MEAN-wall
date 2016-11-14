console.log('Users Factory');

app.factory('usersFactory', ['$http', '$cookies',  function($http, $cookies) {

  var users = [];
  var users = {};
  var logged_in_user = null;

  function UsersFactory(){

  var _this = this;

    this.create = function(user, callback){
      if(user.password != user.password2){
        callback({errors: ['Passwords do not match!']});
      }else{
        $http.post('/reg', user).then(function(returned_data){
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          $cookies.put('user', true , {'expires': expireDate});
          logged_in_user = returned_data.data
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
          logged_in_user = returned_data.data
          callback(returned_data.data);
        });
      }
    };

    this.getUser = function(callback){
      callback(logged_in_user);
    }

    this.logout = function(){
      $cookies.remove('user');
      logged_in_user = null;
    }

  }

  console.log(new UsersFactory());
  return new UsersFactory();

}]);
