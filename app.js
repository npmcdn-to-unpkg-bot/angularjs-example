//MODULE
var weatherApp = angular.module("weatherApp", ["ngRoute", "ngResource"]);

//ROUTES
weatherApp.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "pages/home.html",
    controller: "homeController"
  }).when("/forecast", {
    templateUrl: "pages/forecast.html",
    controller: "forecastController"
  }).when("/forecast/:days", {
    templateUrl: "pages/forecast.html",
    controller: "forecastController"
  });
});

//SERVICES
weatherApp.service("cityService", function() {
  this.city = "New York";
});

//CONTROLLERS
weatherApp.controller("homeController", ["$scope", "cityService", 
function($scope, cityService) {
  $scope.city = cityService.city;
  $scope.$watch("city", function() {
      cityService.city = $scope.city;    
  });
}]);

weatherApp.controller("forecastController", ["$scope", "$resource", "$routeParams", "cityService", 
function($scope, $resource, $routeParams, cityService) {
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || "2";
  
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=5ee31097b5ce496cc7e07cfaace214d4",
      {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
  $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});
  
  $scope.milisecondsToDate = function(miliseconds) {
    return new Date(miliseconds * 1000);
  };
  
  $scope.kelvinsToCelsius = function(kelvins) {
    return (kelvins - 273.15).toFixed(2);
  };
}]);