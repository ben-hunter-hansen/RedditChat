/**
 * Created by ben on 12/12/15.
 */
'use strict';


let SignOnCtrl = ['$scope', '$location','AuthService','Views', ($scope, $location, AuthService, Views) => {
    if(AuthService.isLoggedIn()) $location.path(Views.Home);

    $scope.user = { name: "" , password: ""};
    $scope.err = {};
    $scope.signIn = (user) => {
        AuthService.setUser(user);
        $location.path(Views.Home);
    }
}];