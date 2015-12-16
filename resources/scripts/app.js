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
        }).otherwise({redirectTo: '/signon'});
}];

let AppStart = ['AuthService', '$location','$rootScope','Views','Logger', (AuthService,$location,$rootScope,Views,Logger) => {

    $rootScope.$on('$routeChangeStart', () => {
        AuthService.getUser().then((user) => {
            if(!user) $location.path(Views.SignOn);
        });
    });
}];
/**
 * Created by ben on 12/12/15.
 */
'use strict';

let AuthService = ['Storage','Logger', (Storage,Logger) => {
    let service = {};
    service._user = null;

    service.setUser = (user) => {
        let data = {};
        data[Storage.UserKey] = user;
        Storage.Local.set(data);
    };

    service.getUser = () => {
        return new Promise((resolve,reject) => {
            Storage.Local.get(Storage.UserKey, (data) => {
                resolve(data[Storage.UserKey]);
            });
        });
    };

    service.logout = () => {
        Storage.Local.get(Storage.UserKey, (data) => {
            delete data[Storage.UserKey];
            Storage.Local.set(data);
        });
    };

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
    AuthService.getUser().then((user) => {
        $scope.user = user;
    });
    //SignalR.connect().then(() => {
    //    SignalR.greetAll($scope.user.name);
    //}).catch((err) => Logger.warn(err));
}];
/**
 * Created by ben on 12/14/15.
 */
let Logger = [() => {
    let service = {};

    service.log  = (msg) => console.log(msg);
    service.debug = (msg) => console.debug(msg);
    service.warn = (msg) => console.warn(msg);
    service.error = (msg) => console.error(msg);
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
            scope.isLoggedIn = _ => $location.path() !== Views.SignOn;
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


let SignOnCtrl = ['$scope', '$location','AuthService','Views','$http','Logger', ($scope, $location, AuthService, Views, $http, Logger) => {
    $scope.user = { name: "" , password: ""};
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
    .constant('Views', {
        Home: '/home',
        SignOn: '/signon',
        SubReddits: '/subreddits',
        Conversations: '/conversations'
    })
    .value('$', $)
    .run(AppStart);
