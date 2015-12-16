/**
 * Created by ben on 12/12/15.
 */
'use strict';


let SignOnCtrl = ['$scope', '$location','AuthService','Views','$sce', ($scope, $location, AuthService, Views, $sce) => {
    $scope.user = { name: "" , password: ""};
    $scope.signIn = (user) => {
        AuthService.setUser(user);
        $location.path(Views.ConfirmSignOn);
    }
}];