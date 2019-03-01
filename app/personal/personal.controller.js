(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('PersonalController', ['$rootScope', '$scope', function ($rootScope, $scope) {

            let vm = this;
            vm.title = 'Please select your Yasna plan';

            //$scope.test = $scope.formData.yasna;
            $scope.formData = {
                availableOptions: [
                    {id: '1', name: 'Ясна Лайт'},
                    {id: '2', name: 'Ясна 35'},
                    {id: '3', name: 'Ясна 35 плюс'},
                    {id: '4', name: 'Ясна 50'},
                    {id: '5', name: 'Ясна 50 SMART'},
                    {id: '6', name: 'Ясна 75'},
                    {id: '7', name: 'Ясна 75 плюс'},
                    {id: '8', name: 'Ясна 100'},
                    {id: '9', name: 'Ясна 100 SMART'},
                    {id: '10', name: 'Ясна 200'},
                    {id: '11', name: 'Игровой'},
                    {id: '12', name: 'Игровой Smart'}
                ],
                selectedOption: {id: '1', name: 'Ясна Лайт'}
            };

            $scope.getYasnaPlan = function (plan) {
                $rootScope.yasnaPlan = plan;
            }
        }]);

})();
