(function () {
    'use strict';

    angular.module('wizardApp')
        .factory('preloaderService', function () {
            return {
                initSpinner: function ($scope) {
                    $scope.ShowSpinnerStatus = true;
                },
                showSpinner: function ($scope) {
                    $scope.ShowSpinnerStatus = true;
                },
                hideSpinner: function ($scope) {
                    $scope.ShowSpinnerStatus = false;
                },
            };
        });
})();