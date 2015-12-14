/**
 * Created by ben on 11/20/15.
 */
'use strict';


const RedditChatApp =
    angular.module('RedditChat', [
        'ngRoute'
    ])
    .config(AppConfig)
    .factory('AuthService', AuthService)
    .directive('navBar', NavBar)
    .service('SignalR', SignalR)
    .constant('Storage', {
        UserKey: 'RedditChat_USR'
    })
    .constant('ChatAPI', {
        Url: 'http://localhost:8080/signalr',
        Config: {
            useDefaultPath: false
        },
        HubName: 'myHub'
    })
    .constant('Views', {
        Home: '/home',
        SignOn: '/signon',
        SubReddits: '/subreddits',
        Conversations: '/conversations'
    })
    .value('$', $)
    .value('Logger', chrome.extension.getBackgroundPage().console)
    .run(AppStart);
