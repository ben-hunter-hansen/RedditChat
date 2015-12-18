/**
 * Created by ben on 12/16/15.
 */

let AuthWebView = ['$location','Views','AuthAPI','AuthService','Logger',($location, Views, AuthAPI, AuthService, Logger) => {
    "use strict";

    return {
        restrict: 'A',
        link: (scope,elem,attrs) => {

            var getQueryString = function ( field, url ) {
                var href = url ? url : window.location.href;
                var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
                var string = reg.exec(href);
                return string ? string[1] : null;
            };

            elem[0].addEventListener('contentload', () => {
                let loadSrc = elem[0]["src"];
                if(loadSrc.indexOf(AuthAPI.SuccessCallback) > -1) {
                    let code = getQueryString('code', loadSrc);
                    AuthService.getAccessToken(code).then((res) => {
                        $location.path(Views.Home);
                        scope.$apply();
                    });
                }
            });
        }
    }
}];