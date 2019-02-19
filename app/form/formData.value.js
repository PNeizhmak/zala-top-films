(function () {
    'use strict';
 
    angular
        .module('wizardApp')
        .value('FormDataModel', FormDataModel);
 
    function FormDataModel() {
        this.yasna = '';
    }
})();