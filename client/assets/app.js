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
    .when('/wall',{
      templateUrl: '../partials/success.html',
      controller: 'acctController'
    })
    .otherwise({
      redirectTo: '/login'
    });
});
