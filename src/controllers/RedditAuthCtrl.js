/**
 * Created by ben on 12/16/15.
 */
let RedditAuthCtrl = ['$scope','$sce','AuthService','Logger', ($scope, $sce, AuthService, Logger) => {
    "use strict";
    $scope.webViewSrc = "";
    $scope.srcLoaded = false;
    AuthService.getOauthUrl().then((resp) => {
        $scope.webViewSrc = $sce.trustAsResourceUrl(resp);
        $scope.srcLoaded = true;
        $scope.$apply();
    });
}];