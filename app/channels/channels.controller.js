(function () {
    'use strict';

    angular.module('wizardApp')
        .controller('ChannelsController', ['$rootScope', '$scope', '$http', 'preloaderService', function ($rootScope, $scope, $http, preloaderService) {

            preloaderService.initSpinner($scope);

            let vm = this;
            vm.title = 'Here is the list of your TV channels';

            preloaderService.showSpinner($scope);
            $http.get('https://cors-anywhere.herokuapp.com/http://yasna.by')
                .success(function (data) {
                    preloaderService.hideSpinner($scope);

                    let yasnaToTutbyChannels = new Map([
                        ['ТНТ Интернэшнл', 'ТНТ Int (Беларусь)'],
                        ['ТВ3', 'ТВ3 (Беларусь)'],
                        ['Viasat TV 1000', 'TV1000'],
                        ['Viasat TВ 1000 Русское кино', 'TV1000 Русское кино'],
                        ['Viasat TV1000 Action', 'TV1000 Action'],
                        ['НТВ+ Кинохит', 'Кинохит'],
                        ['НТВ + Наше новое кино', 'Наше новое кино'],
                        ['Мужское КИНО', 'Мужское кино'],
                        ['Sony Sci Fi', 'Sony Sci-Fi'],
                        ['Fox', 'FOX'],
                        ['AMEDIA HIT', 'Amedia Hit'],
                        ['Discovery Channel', 'Discovery Россия'],
                        ['Animal Planet', 'Animal Planet Россия'],
                        ['Viasat Explorer', 'Viasat Explore'],
                        ['Viasat Nature', 'Viasat Nature / History HD'],
                        ['Travel Channel TV', 'Travel Channel'],
                        ['EuroNews', 'Euronews'],
                        ['Setanta Sports Eurasia', 'Setanta Sport'],
                        ['Setanta Sports Eurasia+', 'Setanta Sport +'],
                        ['Матч премьер', 'Матч! Премьер'],
                        ['КХЛ', 'КХЛ ТВ'],
                        ['Extreme Sports', 'Extreme Sports Channel'],
                        ['RU TV', 'RU.TV-Беларусь'],
                        ['Перец', 'Перец International'],
                        ['Телеканал 2х2', '2х2'],
                        ['МИР HD', 'МИР Premium HD'],
                        ['Cartoon network', 'Cartoon Network'],
                        ['Детский мир / Телеклуб', 'Детский мир'],
                        ['Охота и рыбалка', 'Охота и Рыбалка'],
                        ['Охотник и рыболов HD', 'Охотник и рыболов'],
                        ['Минск TV', 'Мiнск ТV']]);

                    let domData = new DOMParser().parseFromString(data, "text/html");
                    let yasnaModals = domData.querySelectorAll('[id^=Modal]');

                    $rootScope.channels = [];
                    angular.forEach(yasnaModals, function (value) {
                        if (value.querySelector('#myModalLabel').textContent === $rootScope.yasnaPlan.name) {

                            let channelsDom = value.querySelectorAll('a');
                            $scope.channelsSize = channelsDom.length;

                            angular.forEach(channelsDom, function (value, index) {
                                console.log(index + '-' + value.text);

                                if (yasnaToTutbyChannels.has(value.text)) {
                                    $rootScope.channels.push(yasnaToTutbyChannels.get(value.text));
                                } else {
                                    $rootScope.channels.push(value.text);
                                }
                            });
                        }
                    });
                    console.log($rootScope.channels);
                })
                .error(function (data) {
                    preloaderService.hideSpinner($scope);
                    console.log('Error: ' + data);
                });
        }]);
})();
