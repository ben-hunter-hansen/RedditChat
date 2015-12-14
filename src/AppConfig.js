/**
 * Created by ben on 12/12/15.
 */

'use strict';

let AppConfig = ['$routeProvider', $routeProvider => {
    $routeProvider
        .when('/signon',{
            templateUrl: 'signon.html',
            controller: SignOnCtrl
        }).when('/home', {
            templateUrl: 'home.html',
            controller: HomeCtrl
        }).when('/subreddits', {
            templateUrl: 'subreddits.html',
            controller: SubRedditCtrl
        }).when('/conversations', {
            templateUrl: 'conversations.html',
            controller: ConversationCtrl
        }).when('/subreddits/:which', {
            template: '<h1> /r/somesub </h1>'
        }).otherwise({redirectTo: '/home'});
}];

let AppStart = ['AuthService', '$location','$rootScope','Views', (AuthService,$location,$rootScope,Views) => {
    $rootScope.$on('$routeChangeStart', () => {
        if(!AuthService.isLoggedIn()) {
            $location.path(Views.SignOn);
        }
    })
}];