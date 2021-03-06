(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('FilmsController', ['$rootScope', '$scope', '$http', 'preloaderService', function ($rootScope, $scope, $http, preloaderService) {

            preloaderService.initSpinner($scope);

            let vm = this;
            vm.title = 'Here is the list of films provided by ' + $rootScope.yasnaPlan.name + ' plan: ';

            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

            let urlDate = dd + '-' + mm + '-' + yyyy;
            $rootScope.matchedChannelsDom = [];
            $rootScope.matchedChannelsNames = [];

            preloaderService.showSpinner($scope);
            $http.get('https://cors-anywhere.herokuapp.com/https://tvset.tut.by/all/' + urlDate + '/filter/allday/?genre%5B0%5D=1')
                .success(function (data) {
                    preloaderService.hideSpinner($scope);

                    let domData = new DOMParser().parseFromString(data, "text/html");
                    let domChannels = domData.getElementsByClassName('channel');

                    $rootScope.films = [];
                    let excludes = ['Кинокомедия', 'Мужское кино'];

                    angular.forEach(domChannels, function (value, index) {
                        let channelName = value.getElementsByClassName('channel-name')[0].textContent;

                        if ($rootScope.channels.indexOf(channelName) >= 0) {
                            $rootScope.matchedChannelsDom.push(value);
                            $rootScope.matchedChannelsNames.push(channelName);
                            console.log(index + ' - ' + channelName);
                        } else {
                            console.log('-->Cant match: ' + index + ' - ' + channelName);
                        }
                    });

                    console.log($rootScope.matchedChannelsNames.length);
                    console.log($rootScope.matchedChannelsDom.length);

                    angular.forEach($rootScope.matchedChannelsDom, function (value) {

                        let channelName = value.getElementsByClassName('channel-name')[0].textContent;
                        console.log('----------------------');
                        console.log(channelName);

                        let filmObj;
                        if (excludes.indexOf(channelName) >= 0) {
                            filmObj = value.getElementsByClassName('event-time');
                        } else {
                            filmObj = value.querySelectorAll('[data-genre-1="1"]');
                        }

                        angular.forEach(filmObj, function (value) {
                            let filmTime = value.innerText.trim();
                            console.log(filmTime);

                            let filmTitle = value.nextElementSibling.innerText.trim();
                            console.log(filmTitle);

                            let filmData = {channelName: channelName, filmTime: filmTime, filmTitle: filmTitle};
                            $rootScope.films.push(filmData);
                        });
                    });
                    $scope.filmsLength = $rootScope.films.length;
                    console.log($scope.groupedFilms);
                })
                .error(function (data) {
                    preloaderService.hideSpinner($scope);
                    console.log('Error: ' + data);
                });

        }]);

    angular.module('wizardApp')
    .filter('groupBy', function() {
        return _.memoize(function(items, field) {
            return _.groupBy(items, field);
        });
    });
})();
