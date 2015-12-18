/**
 * Created by ben on 12/12/15.
 */
'use strict';


let SignOnCtrl = ['$scope', '$location','Views','UserService', ($scope, $location, Views, UserService) => {
    $scope.user = { name: "" , password: ""};
    UserService.getLoginStatus().then(function(resp) {
        if(resp.data["loggedIn"]) {
            $location.path(Views.Home);
        }
    });
    $scope.signIn = () => {
        $location.path(Views.ConfirmSignOn);
    }
}];