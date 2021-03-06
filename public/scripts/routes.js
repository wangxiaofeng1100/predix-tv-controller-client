/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('index', {
                parent: 'secure',
                url: '/index',
                templateUrl: 'views/index.html',
                controller: 'IndexCtrl'
            })
            .state('temperature', {
                url: '/temperature',
                controller: 'TemperatureCtrl',
                templateUrl: 'views/temperature.html'
            })
            .state('blanksubpage', {
                url: '/blanksubpage',
                templateUrl: 'views/blank-sub-page.html'
            })
            .state('air', {
                url: '/air',
                controller: 'AirCtrl',
                templateUrl: 'views/air.html'
            })
            .state('TV-Controller', {
                parent: 'secure',
                url: '/tvController',
                templateUrl: 'views/tvController.html'
            });
            ;


        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/index');
            $state.go('index');
        });

    }]);
});
