/**
 * Created by ben on 12/12/15.
 */
'use strict';


let HomeCtrl = ['$scope','UserService','SignalR', ($scope, UserService, SignalR) => {
    $scope.user = {};
    UserService.getUser().then((user) => {
        $scope.user = user;
        $scope.$apply();
    });


    //SignalR.connect().then(() => {
    //    SignalR.greetAll($scope.user.name);
    //}).catch((err) => Logger.warn(err));
}];