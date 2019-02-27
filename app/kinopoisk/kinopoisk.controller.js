(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('KinopoiskController', ['$rootScope', '$scope', '$http', '$q', function ($rootScope, $scope, $http, $q) {

            let vm = this;
            vm.title = 'Here is the list of films sorted by kinopoisk raiting';

            $scope.kinopoiskData = [];

            angular.forEach($rootScope.films, function (value, index) {

                let filmTitle = value.filmTitle;

                let headers = new Headers();
                headers.append('Access-Control-Allow-Origin', '*');

                $http.get('https://cors-anywhere.herokuapp.com/https://www.kinopoisk.ru/handler_search.php?q=' + filmTitle + '&topsuggest=true', {headers: headers})
                    .success(function (data) {
                        let filmData = {
                            channelName: value.channelName,
                            filmTime: value.filmTime,
                            filmTitle: filmTitle,
                            kinopoisk: data
                        };
                        $scope.kinopoiskData.push(filmData);
                        console.log(filmData);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
                $scope.promise = $http.get('https://cors-anywhere.herokuapp.com/https://www.kinopoisk.ru/handler_search.php?q=' + filmTitle + '&topsuggest=true', {headers: headers});
            });

            $scope.promise.then(function () {
                console.log($scope.kinopoiskData);
                alert('Enjoy the result !')
            });
        }]);
})();
