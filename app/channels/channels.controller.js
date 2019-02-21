(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('ChannelsController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

            let vm = this;
            vm.title = 'Here is the list of your TV channels';

            $http.get('https://cors-anywhere.herokuapp.com/http://yasna.by')
                .success(function (data) {
                    alert("Got the response from yasna.by");

                    let domData = new DOMParser().parseFromString(data, "text/html");
                    let yasnaModals = domData.querySelectorAll('[id^=Modal]');

                    $scope.channels = [];
                    angular.forEach(yasnaModals, function (value, index) {
                        if (value.querySelector('#myModalLabel').textContent === $rootScope.yasnaPlan.name) {
                            alert('Selected plan is equals to yasna.by plan');

                            let channelsDom = value.querySelectorAll('a');
                            $scope.channelsSize = channelsDom.length;

                            angular.forEach(channelsDom, function (value, index) {
                                console.log(index + '-' + value.text);
                                $scope.channels.push(value.text);
                            });
                        }
                    });
                })
                .error(function (data) {
                    alert(data);
                    console.log('Error: ' + data);
                });

        }]);
})();
