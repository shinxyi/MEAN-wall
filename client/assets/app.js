var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '../partials/login.html',
      controller: 'newController'
    })
    .when('/registration',{
      templateUrl: '../partials/reg.html',
      controller: 'newController'
    })
    .when('/success',{
      templateUrl: '../partials/success.html',
      controller: 'acctController'
    })
    .when('/secure',{
      templateUrl: '../partials/secure.html',
      controller: 'acctController'
    })
    .when('/secret',{
      templateUrl: '../partials/secret.html',
      controller: 'acctController'
    })
    .otherwise({
      redirectTo: '/login'
    });
});
