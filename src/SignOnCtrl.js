/**
 * Created by ben on 12/12/15.
 */
'use strict';


let SignOnCtrl = ['$scope', '$location','AuthService','Views','$http','Logger', ($scope, $location, AuthService, Views, $http, Logger) => {
    $scope.user = { name: "" , password: ""};
    $scope.signIn = (user) => {
        AuthService.setUser(user);
        $location.path(Views.Home);
    }
}];