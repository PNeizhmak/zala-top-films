(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('KinopoiskController', ['$rootScope', '$scope', '$http', 'preloaderService', function ($rootScope, $scope, $http, preloaderService) {

            preloaderService.initSpinner($scope);

            let vm = this;
            vm.title = 'Here is the list of films sorted by kinopoisk raiting';

            $scope.kinopoiskData = [];

            angular.forEach($rootScope.films, function (value) {

                let filmTitle = value.filmTitle;

                let headers = new Headers();
                headers.append('Access-Control-Allow-Origin', '*');

                preloaderService.showSpinner($scope);
                $http.get('https://cors-anywhere.herokuapp.com/https://www.kinopoisk.ru/handler_search.php?q=' + filmTitle + '&topsuggest=true', {headers: headers})
                    .success(function (data) {
                        let filmData = {
                            channelName: value.channelName,
                            filmTime: value.filmTime,
                            filmTitle: filmTitle,
                            filmRating: data[0].ur_rating,
                            filmYear: data[0].year
                            // kinopoisk: data
                        };
                        $scope.kinopoiskData.push(filmData);
                        console.log(filmData);
                    })
                    .error(function (data) {
                        preloaderService.hideSpinner($scope);
                        console.log('Error: ' + data);
                    });
                $scope.promise = $http.get('https://cors-anywhere.herokuapp.com/https://www.kinopoisk.ru/handler_search.php?q=' + filmTitle + '&topsuggest=true', {headers: headers});
            });

            $scope.promise.then(function () {
                preloaderService.hideSpinner($scope);
                console.log($scope.kinopoiskData);
            });
        }]);
})();
