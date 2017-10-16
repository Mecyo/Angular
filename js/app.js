(function () {
    'use strict';
 
    angular.module('G', ['ui.bootstrap', 'ui.router', 'ng.openui5'])
 
        .value('config', {
            apiUrl: '/api'
        })
 
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "partials/home.html",
                    controller: 'HomeController'
                });
        })
 
        .controller('HomeController', function ($scope, $http, $log, config) {
            $scope.refresh = function () {
                $http.get(config.apiUrl + '/gridData').success(function (data) {
                    $scope.datagrid.data = data;
                });
            };
 
            $scope.datagrid = {
                conf: {
                    title: "Desafio",
                    navigationMode: sap.ui.table.NavigationMode.Paginator
                },
                columns: [
                    {
                        label: new sap.ui.commons.Label({text: "ID"}),
                        template: new sap.ui.commons.TextView().bindProperty("value", "id"),
                        sortProperty: "id",
                        filterProperty: "id",
                        width: "75px"
						hAlign: "Center"
                    }, {
                        label: new sap.ui.commons.Label({text: "Nome"}),
                        template: new sap.ui.commons.TextField().bindProperty("text", "name"),
                        sortProperty: "name",
                        filterProperty: "name",
                        width: "200px"
                    }, {
                        label: new sap.ui.commons.Label({text: "E-mail"}),
                        template: new sap.ui.commons.Link().bindProperty("text", "email").bindProperty("href", "href"),
                        sortProperty: "email",
                        filterProperty: "email"
                    }, {
                        label: new sap.ui.commons.Label({text: "Rating"}),
                        template: new sap.ui.commons.RatingIndicator().bindProperty("value", "rating"),
                        sortProperty: "rating",
                        filterProperty: "rating"
                    }
 
                ]
            };
        })
    ;
}());