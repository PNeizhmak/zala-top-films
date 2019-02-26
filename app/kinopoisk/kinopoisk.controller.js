(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('KinopoiskController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

            let vm = this;
            vm.title = 'Here is the list of films sorted by kinopoisk raiting';

            angular.forEach($rootScope.films, function (value, index) {

                let filmTitle = value.filmTitle;

                let headers = new Headers();
                headers.append('Access-Control-Allow-Origin', '*');

                $http.get('https://cors-anywhere.herokuapp.com/https://www.kinopoisk.ru/handler_search.php?q=' + filmTitle + '&topsuggest=true', {headers: headers})
                    .success(function (data) {
                        console.log('-----------');
                        console.log(filmTitle);
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });

            });
        }]);
})();
