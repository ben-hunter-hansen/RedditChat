/**
 * Created by ben on 12/12/15.
 */
'use strict';


let HomeCtrl = ['$scope','AuthService','SignalR','Logger', ($scope, AuthService, SignalR, Logger) => {
    AuthService.getUser().then((user) => {
        $scope.user = user;
    });
    //SignalR.connect().then(() => {
    //    SignalR.greetAll($scope.user.name);
    //}).catch((err) => Logger.warn(err));
}];