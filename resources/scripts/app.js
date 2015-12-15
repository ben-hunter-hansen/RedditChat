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
/**
 * Created by ben on 12/12/15.
 */
'use strict';



let AuthService = ['Storage','$http', (Storage,$http) => {
    let service = {};

    service.setUser = user => window.localStorage.setItem(Storage.UserKey, JSON.stringify(user));
    service.getUser = _ => JSON.parse(window.localStorage.getItem(Storage.UserKey)) || {};
    service.isLoggedIn = _ => !!window.localStorage.getItem(Storage.UserKey);
    service.logout = _ => window.localStorage.removeItem(Storage.UserKey);

    return service;
}];
/**
 * Created by ben on 12/12/15.
 */
'use strict';


let ConversationCtrl = ['$scope', ($scope) => {

}];
/**
 * Created by ben on 12/12/15.
 */
'use strict';


let HomeCtrl = ['$scope','AuthService','SignalR','Logger', ($scope, AuthService, SignalR, Logger) => {
    $scope.user = AuthService.getUser();
    SignalR.connect().then(() => {
        SignalR.greetAll($scope.user.name);
    }).catch((err) => Logger.warn(err));
}];
/**
 * Created by ben on 12/14/15.
 */
let Logger = [() => {
    let service = {},
        background = chrome.extension.getBackgroundPage();

    service.log  = (msg) => background.console.log(msg);
    service.debug = (msg) => background.console.debug(msg);
    service.warn = (msg) => background.console.warn(msg);
    service.error = (msg) => background.console.error(msg);
    return service;
}];
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
            scope.isLoggedIn = AuthService.isLoggedIn;
            scope.getUser = AuthService.getUser;
            scope.navigateTo = view => $location.path(view);
            scope.logout = () => {
                AuthService.logout();
                $location.path(Views.SignOn);
            };
        }
    }
}];
/**
 * Created by ben on 12/12/15.
 */
'use strict';


let SignOnCtrl = ['$scope', '$location','AuthService','Views', ($scope, $location, AuthService, Views) => {
    if(AuthService.isLoggedIn()) $location.path(Views.Home);

    $scope.user = { name: "" , password: ""};
    $scope.err = {};
    $scope.signIn = (user) => {
        AuthService.setUser(user);
        $location.path(Views.Home);
    }
}];
/**
 * Created by ben on 12/13/15.
 */
let SignalR = ['$','ChatAPI', ($, ChatAPI) => {
    let service = {},
        connection = {},
        proxy = {};

    service.connect = () => {

        connection = $.hubConnection(ChatAPI.Url, ChatAPI.Config);
        proxy = connection.createHubProxy(ChatAPI.HubName);

        return new Promise((resolve, reject) => {
            connection.start().done(() => {
                resolve({status: "Connected sucessfully"});
            }).fail((err) => {
                reject({status: 'Connection failed', reason: err});
            });
        });
    };

    service.greetAll = (user) => {
        proxy.invoke('greetAll', user);
    };

    return service;
}];
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
    .factory('Logger', Logger)
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
        HubName: 'chatHub'
    })
    .constant('Views', {
        Home: '/home',
        SignOn: '/signon',
        SubReddits: '/subreddits',
        Conversations: '/conversations'
    })
    .value('$', $)
    .run(AppStart);
