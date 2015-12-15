/**
 * Created by ben on 12/12/15.
 */
'use strict';


let HomeCtrl = ['$scope','AuthService','SignalR','Logger', ($scope, AuthService, SignalR, Logger) => {
    $scope.user = AuthService.getUser();
    SignalR.connect().then(() => {
        SignalR.greetAll($scope.user.name);
    }).catch((err) => Logger.warn(err));
}];