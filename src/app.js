/**
 * Created by ben on 11/20/15.
 */
'use strict';


const RedditChatApp =
    angular.module('RedditChat', [
        'ngRoute'
    ], ($provide) => {

        // The history.pushState API isn't available to chrome packaged apps.
        // The following few lines are a hack to suppress the error.
        // https://github.com/angular/angular.js/issues/11932

        $provide.decorator('$window',($delegate) => {
            $delegate.history = null;
            return $delegate;
        });
    })
    .config(AppConfig)
    .factory('AuthService', AuthService)
    .factory('Logger', Logger)
    .directive('navBar', NavBar)
    .directive('authWebView', AuthWebView)
    .service('SignalR', SignalR)
    .constant('Storage', {
        UserKey: 'RedditChat_USR',
        Local: chrome.storage.local
    })
    .constant('ChatAPI', {
        Url: 'http://localhost:8080/signalr',
        Config: {
            useDefaultPath: false
        },
        HubName: 'chatHub'
    })
    .constant('AuthAPI', {
        Url: 'http://localhost:3000/authorize',
        SuccessCallback: 'http://localhost:3000/authorize/reddit_callback'
    })
    .constant('Views', {
        Home: '/home',
        SignOn: '/signon',
        ConfirmSignOn: '/signon/confirm',
        SubReddits: '/subreddits',
        Conversations: '/conversations'
    })
    .value('$', $)
    .run(AppStart);
