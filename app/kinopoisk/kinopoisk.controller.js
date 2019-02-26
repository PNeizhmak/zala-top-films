(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('KinopoiskController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

            let vm = this;
            vm.title = 'Here is the list of films sorted by kinopoisk raiting';

            angular.forEach($rootScope.films, function (value, index) {

                let filmTitle = value.filmTitle;

                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('origin', 'x-requested-with');
                headers.append('X-Requested-With', '');
                headers.append('XMLHttpRequest', '');
                headers.append('Host', 'www.kinopoisk.ru');
                headers.append('Accept', '*/*');
                headers.append('User-Agent', 'Mozilla/5.0');

                let params = new URLSearchParams();
                params.append("q", filmTitle);
                params.append("topsuggest", 'true');
                params.append("ajax", '1');

                $http.get('https://cors-anywhere.herokuapp.com/https://www.kinopoisk.ru/handler_search.php?q=Ирландец&topsuggest=true', {headers: headers})
                    .success(function (data) {

                        let domData = new DOMParser().parseFromString(data, "text/html");
                        let domChannels = domData.getElementsByClassName('channel');

                    })
                    .error(function (data) {
                        alert(data);
                        console.log('Error: ' + data);
                    });

            });
        }]);
})();
