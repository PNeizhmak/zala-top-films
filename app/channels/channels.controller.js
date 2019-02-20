(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('ChannelsController', ['$rootScope','$scope', '$http', function ($rootScope, $scope, $http) {

            let vm = this;
            vm.title = 'Here is the list of your TV channels';

            $http.get('https://cors-anywhere.herokuapp.com/http://yasna.by')
                .success(function (data) {
                    alert("success: see console");
                    // console.log(data);

                    let domData = new DOMParser().parseFromString(data, "text/html");

                    let yasnaModals = domData.querySelectorAll('[id^=Modal]');

                    console.log(yasnaModals);

                    $scope.yasnaModalsFormatted = [];
                    angular.forEach(yasnaModals,function(value,index){
                        $scope.yasnaModalsFormatted.push(value.id);
                    });

                    console.log($scope.yasnaModalsFormatted);

                })
                .error(function (data) {
                    alert(data);
                    console.log('Error: ' + data);
                });

        }]);
})();
