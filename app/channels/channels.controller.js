(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('ChannelsController', ['$rootScope', function ($rootScope) {

            var vm = this;
            vm.title = 'Here is the list of your TV channels';

            console.log($rootScope.yasnaPlan);
            console.log($rootScope.yasnaPlan.name);

        }]);

})();
