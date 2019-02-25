(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('FilmsController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

            let vm = this;
            vm.title = 'Here is the list of films providede by ' + $rootScope.yasnaPlan.name + ' plan: ';

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

            $http.get('https://cors-anywhere.herokuapp.com/https://tvset.tut.by/all/' + urlDate + '/filter/allday/?genre%5B0%5D=1')
                .success(function (data) {
                    alert("Got the response from tvset.tut.by");

                    let domData = new DOMParser().parseFromString(data, "text/html");
                    let domChannels = domData.getElementsByClassName('channel');

                    $scope.films = [];

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

                    angular.forEach($rootScope.matchedChannelsDom, function (value, index) {

                        let channelName = value.getElementsByClassName('channel-name')[0].textContent;
                        console.log('----------------------');
                        console.log(channelName);

                        let filmObj = value.querySelectorAll('[data-genre-1="1"]');

                        angular.forEach(filmObj, function (value, index) {
                            let filmTime = value.innerText.trim();
                            console.log(filmTime);

                            let filmTitle = value.nextElementSibling.innerText.trim();
                            console.log(filmTitle);

                            let filmData = {channelName: channelName, filmTime: filmTime, filmTitle: filmTitle};
                            $scope.films.push(filmData);
                        });
                    });
                    $scope.filmsLength = $scope.films.length;
                })
                .error(function (data) {
                    alert(data);
                    console.log('Error: ' + data);
                });

        }]);
})();
