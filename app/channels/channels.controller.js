(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('ChannelsController', ['$rootScope','$scope', '$http', function ($rootScope, $scope, $http) {

            let vm = this;
            vm.title = 'Here is the list of your TV channels';

            $http.get('https://cors-anywhere.herokuapp.com/http://yasna.by')
                .success(function (data) {
                    alert("success: see console");

                    let domData = new DOMParser().parseFromString(data, "text/html");
                    let yasnaModals = domData.querySelectorAll('[id^=Modal]');

                    console.log(yasnaModals);

                    $scope.yasnaModalsFormatted = [];
                    angular.forEach(yasnaModals,function(value,index){

                        if (value.querySelector('#myModalLabel').textContent === $rootScope.yasnaPlan.name) {
                            alert('Selected plan is equals to yasna.by plan');
                            console.log(value.querySelector('#myModalLabel').textContent + ' --equals to--- ' + $rootScope.yasnaPlan.name)

                            //todo: value.querySelectorAll('[id^=Modal] > div > div > div.modal-body > div')
                        }
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
