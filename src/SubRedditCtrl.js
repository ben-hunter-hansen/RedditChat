/**
 * Created by ben on 12/12/15.
 */
'use strict';

let SubRedditCtrl = ['$scope','$location', ($scope, $location) => {
    $scope.subReddits = [];
    for(let i = 0; i < 15; i++) {
        $scope.subReddits.push({
            title: 'somesub',
            url: '/subreddits/somesub',
            numActive: i
        });
    }

    $scope.navigateTo = subRedditUrl => $location.path(subRedditUrl);
}];