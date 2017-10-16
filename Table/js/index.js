var app = angular.module('StarterApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

app.config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
    .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
    .defaultIconSet('img/icons/sets/core-icons.svg', 24);
});

app.controller('AppCtrl', function($scope, $http){
  $scope.toggleSearch = false;
  $http.get("https://cdn.cubos.io/downloads/moviesdataset.json").then(function (response) {
		  $scope.content = response.data.users;
		  $scope.movies = response.data.movies;
		  $scope.ratings = response.data.ratings;
		  mov = $scope.movies;
		  rat = $scope.ratings;
	  });
  $scope.headers = [
    {
      name:'',
      field:'thumb'
    },{
      name: 'ID', 
      field: 'id'
    },{
      name: 'Nome', 
      field: 'name'
    },{
      name:'E-mail', 
      field: 'email'
    },{
      name: 'Filmes avaliados', 
      field: 'description'
    }
  ];
  
  
  $scope.custom = {name: 'bold', description:'grey',email: 'blue'};
  $scope.sortable = ['name', 'description', 'email'];
  $scope.thumbs = 'thumb';
  $scope.count = 3;
});

app.directive('mdTable', function () {
  return {
    restrict: 'E',
    scope: { 
      headers: '=', 
      content: '=', 
      sortable: '=', 
      filters: '=',
      customClass: '=customClass',
      thumbs:'=', 
      count: '=' 
    },
    controller: function ($scope,$filter,$window) {
      var orderBy = $filter('orderBy');
      $scope.tablePage = 0;
      $scope.nbOfPages = function () {
        return Math.ceil($scope.content.length / $scope.count);
      },
      	$scope.handleSort = function (field) {
          if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
      };
      $scope.order = function(predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
      };
      $scope.order($scope.sortable[0],false);
      $scope.getNumber = function (num) {
      			    return new Array(num);
      };
      $scope.goToPage = function (page) {
        $scope.tablePage = page;
      };
    },
    template: angular.element(document.querySelector('#md-table-template')).html()
  }
});

//UNCOMMENT BELOW TO BE ABLE TO RESIZE COLUMNS OF THE TABLE
/*
app.directive('mdColresize', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$evalAsync(function () {
        $timeout(function(){ $(element).colResizable({
          liveDrag: true,
          fixed: true
          
        });},100);
      });
    }
  }
});
*/

app.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };    
});

app.filter('startFrom',function (){
  return function (input,start) {
    start = +start;
    return input.slice(start);
  }
});