//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTE
weatherApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: './app/pages/home.htm',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: './app/pages/forecast.htm',
        controller: 'forecastController'
    })
});

//CONTROLLER
weatherApp.controller('homeController', ['$scope', function($scope) {
    
}]);

weatherApp.controller('forecastController', ['$scope', function($scope) {
    
}]);