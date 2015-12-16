/**
 * Created by ben on 12/12/15.
 */
'use strict';


let NavBar = ['AuthService', 'Views','$location', (AuthService, Views, $location) => {
    return {
        restrict: 'E',
        templateUrl: 'navbar.html',
        link: (scope,elem,attrs) => {
            scope.Views = Views;
            scope.isLoggedIn = _ => $location.path() !== Views.SignOn;
            scope.navigateTo = view => $location.path(view);
            scope.logout = () => {
                AuthService.logout();
                $location.path(Views.SignOn);
            };
        }
    }
}];