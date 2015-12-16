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
/**
 * Created by ben on 12/12/15.
 */
'use strict';

let AuthService = ['Storage','Logger','AuthAPI','$http', (Storage,Logger, AuthAPI, $http) => {
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

    service.getOauthUrl = _ => {
        return new Promise((resolve,reject) => {
            $http.get(AuthAPI.Url).then((res) => resolve(res.data));
        });
    };

    return service;
}];
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
            scope.isLoggedIn = () => {
                return ($location.path() !== Views.SignOn) && ($location.path() !== Views.ConfirmSignOn);
            };
            scope.navigateTo = view => $location.path(view);
            scope.logout = () => {
                AuthService.logout();
                $location.path(Views.SignOn);
            };
        }
    }
}];
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
/**
 * Created by ben on 12/12/15.
 */
'use strict';


let SignOnCtrl = ['$scope', '$location','AuthService','Views','$sce', ($scope, $location, AuthService, Views, $sce) => {
    $scope.user = { name: "" , password: ""};
    $scope.signIn = (user) => {
        AuthService.setUser(user);
        $location.path(Views.ConfirmSignOn);
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
