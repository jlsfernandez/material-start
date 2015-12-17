angular.module('clients').controller('addItemController', ['$mdDialog', '$clients', '$scope', function ($mdDialog, $clients, $scope) {
    'use strict';

    this.cancel = $mdDialog.cancel;

    function success(client) {
        $mdDialog.hide(client);
    }

    this.addItem = function () {
        $scope.item.form.$setSubmitted();

        if ($scope.item.form.$valid) {
            $clients.elementos.save({ client: $scope.client }, success);
        }
    };

}]);