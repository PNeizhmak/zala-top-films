(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('PersonalController', ['$rootScope', '$scope', function ($rootScope, $scope) {

            var vm = this;
            vm.title = 'Please select your Yasna plan';

            //$scope.test = $scope.formData.yasna;
            $scope.formData = {
                availableOptions: [
                    {id: '1', name: 'Ясна Лайт'},
                    {id: '2', name: 'Ясна 35'},
                    {id: '3', name: 'Ясна 35+'},
                    {id: '4', name: 'Ясна 50'},
                    {id: '5', name: 'Ясна 50 smart'},
                    {id: '6', name: 'Ясна 75'},
                    {id: '7', name: 'Ясна 75+'},
                    {id: '8', name: 'Ясна 100'},
                    {id: '9', name: 'Ясна 100 smart'},
                    {id: '10', name: 'Ясна игровой'},
                    {id: '11', name: 'Ясна игровой smart'}
                ],
                selectedOption: {id: '1', name: 'Ясна Лайт'}
            };

            $scope.getYasnaPlan = function (plan) {
                $rootScope.yasnaPlan = plan;
            }
        }]);

})();
