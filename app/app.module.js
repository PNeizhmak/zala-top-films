(function () {
    'use strict';

    let app = angular.module('wizardApp', ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

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

                .state('form.kinopoisk', {
                    url: '/kinopoisk',
                    templateUrl: 'app/kinopoisk/kinopoisk.html',
                    controller: 'KinopoiskController',
                    controllerAs: 'vm'
                })
        }
    ]);
       
})();
