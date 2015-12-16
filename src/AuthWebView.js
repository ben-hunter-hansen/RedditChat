/**
 * Created by ben on 12/16/15.
 */
let AuthWebView = ['$location','Views','AuthAPI','AuthService',($location, Views, AuthAPI, AuthService) => {
    "use strict";

    return {
        restrict: 'A',
        link: (scope,elem,attrs) => {
            elem[0].addEventListener('contentload', () => {
                let loadSrc = elem[0]["src"];
                if(loadSrc.indexOf(AuthAPI.SuccessCallback) > -1) {



                    $location.path(Views.Home);
                    scope.$apply();
                }
            });

        }
    }
}];