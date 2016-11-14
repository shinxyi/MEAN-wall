var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '../partials/login.html',
      controller: 'acctController'
    })
    .when('/registration',{
      templateUrl: '../partials/reg.html',
      controller: 'acctController'
    })
    .when('/wall',{
      templateUrl: '../partials/success.html',
      controller: 'wallController'
    })
    .otherwise({
      redirectTo: '/login'
    });
});
