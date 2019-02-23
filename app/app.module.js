(function() {
    'use strict';

    // Creating our angular app and inject ui-router 
    // =============================================================================
    var app = angular.module('wizardApp', ['ui.router'])

    // Configuring our states 
    // =============================================================================
    app.config(['$stateProvider', '$urlRouterProvider',

        function($stateProvider, $urlRouterProvider) {

            // For any unmatched url, redirect to /form/personal
            $urlRouterProvider.otherwise('/form/personal');
    
            $stateProvider
                .state('form', {
                    url: '/form',
                    templateUrl: 'app/form/form.html',
                    controller: 'FormController'
                })

                .state('form.personal', {
                    url: '/personal',
                    templateUrl: 'app/personal/personal.html',
                    controller: 'PersonalController',
                    controllerAs: 'vm'
                })

                .state('form.channels', {
                    url: '/channels',
                    templateUrl: 'app/channels/channels.html',
                    controller: 'ChannelsController',
                    controllerAs: 'vm'
                })

                .state('form.films', {
                    url: '/films',
                    templateUrl: 'app/films/films.html',
                    controller: 'FilmsController',
                    controllerAs: 'vm'
                })

                .state('form.result', {
                    url: '/result',
                    templateUrl: 'app/result/result.html',
                    controller: 'ResultController',
                    controllerAs: 'vm'
                })
        }
    ]);
       
})();
