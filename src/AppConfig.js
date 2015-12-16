/**
 * Created by ben on 12/12/15.
 */

'use strict';

let AppConfig = ['$routeProvider', $routeProvider => {
    $routeProvider
        .when('/signon',{
            templateUrl: 'signon.html',
            controller: SignOnCtrl
        })
        .when('/signon/confirm',{
            templateUrl: 'reddit-auth.html',
            controller: RedditAuthCtrl
        })
        .when('/home', {
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
        }).otherwise({redirectTo: '/signon'});
}];

let AppStart = ['AuthService', '$location','$rootScope','Views','Logger', (AuthService,$location,$rootScope,Views,Logger) => {

    $rootScope.$on('$routeChangeStart', () => {
        AuthService.getUser().then((user) => {
            if(!user) $location.path(Views.SignOn);
        });
    });
}];