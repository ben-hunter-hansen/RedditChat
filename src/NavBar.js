/**
 * Created by ben on 12/12/15.
 */
'use strict';


let NavBar = ['UserService', 'Views','$location', (UserService, Views, $location) => {
    return {
        restrict: 'E',
        templateUrl: 'navbar.html',
        link: (scope,elem,attrs) => {
            scope.Views = Views;
            scope.isLoggedIn = () => {
                return ($location.path() !== Views.SignOn) && ($location.path() !== Views.ConfirmSignOn);
            };
            scope.navigateTo = view => $location.path(view);
            scope.logout = () => {
                UserService.logout();
                $location.path(Views.SignOn);
            };
        }
    }
}];