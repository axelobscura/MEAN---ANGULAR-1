(function(){
  var app = angular.module('app', ['ngRoute']);

  app.config(function($routeProvider){
    $routeProvider.when('/', {
      controller: 'HomeController',
      controllerAs: 'vm',
      templateUrl: './home.html'
    })
    $routeProvider.otherwise('/');
  });

  app.controller('HomeController', function($http){
    var vm = this;
    vm.users = [];
    vm.getUsers = function(){
      $http.get('/api/users').then(function(response){
        vm.users = response.data;
      });
    }
    vm.getUsers();
  })
})();
