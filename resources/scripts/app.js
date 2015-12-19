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

let AppStart = ['UserService', '$location','$rootScope','Views','Logger', (UserService,$location,$rootScope,Views,Logger) => {

}];
/**
 * Created by ben on 11/20/15.
 */
'use strict';

const RedditChatApp =
    angular.module('RedditChat', [
        'ngRoute',
        'RedditChat.Constants',
        'RedditChat.Controllers',
        'RedditChat.Services',
        'RedditChat.Directives'

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
    .value('$', $)
    .run(AppStart);
/**
 * Created by ben on 12/17/15.
 */

const AuthAPI = {
    InitialReqUrl: 'http://localhost:3000/authorize/initial',
    AccessTokenUrl: 'http://localhost:3000/authorize/access_token',
    SuccessCallback: 'http://localhost:3000/authorize/reddit_callback'
};

const ChatAPI = {
    Url: 'http://localhost:8080/signalr',
    Config: {
        useDefaultPath: false
    },
    HubName: 'chatHub'
};

const UserAPI = {
    LoginUrl: 'http://localhost:3000/users/login',
    LogoutUrl: 'http://localhost:3000/users/logout',
    StatusUrl: 'http://localhost:3000/users/status'
};

const Views = {
    Home: '/home',
    SignOn: '/signon',
    ConfirmSignOn: '/signon/confirm',
    SubReddits: '/subreddits',
    Conversations: '/conversations'
};

const Storage = {
    UserKey: 'RedditChat_USR',
    Local: chrome.storage.local
};


const ConstantsModule =
    angular.module('RedditChat.Constants', [])
        .constant('AuthAPI', AuthAPI)
        .constant('UserAPI', UserAPI)
        .constant('ChatAPI', ChatAPI)
        .constant('Views', Views)
        .constant('Storage', Storage);
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


let HomeCtrl = ['$scope','UserService','SignalR', ($scope, UserService, SignalR) => {
    $scope.user = {};
    UserService.getUser().then((user) => {
        $scope.user = user;
        $scope.$apply();
    });


    //SignalR.connect().then(() => {
    //    SignalR.greetAll($scope.user.name);
    //}).catch((err) => Logger.warn(err));
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


let SignOnCtrl = ['$scope', '$location','Views','UserService', ($scope, $location, Views, UserService) => {
    $scope.user = { name: "" , password: ""};
    UserService.getLoginStatus().then(function(resp) {
        if(resp.data["loggedIn"]) {
            $location.path(Views.Home);
        }
    });
    $scope.signIn = () => {
        $location.path(Views.ConfirmSignOn);
    }
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
 * Created by ben on 12/17/15.
 */

const ControllersModule =
    angular.module('RedditChat.Controllers', [])
        .controller('SignOnCtrl', SignOnCtrl)
        .controller('HomeCtrl', HomeCtrl)
        .controller('ConversationCtrl', ConversationCtrl)
        .controller('RedditAuthCtrl', RedditAuthCtrl)
        .controller('SubRedditCtrl', SubRedditCtrl);
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
/**
 * Created by ben on 12/12/15.
 */
'use strict';


let NavBar = ['UserService', 'Views','$location', (UserService, Views, $location) => {
    return {
        restrict: 'E',
        templateUrl: 'navbar.html',
        link: (scope,elem,attrs) => {
            scope.Views = Views;
            scope.isLoggedIn = () => {
                return ($location.path() !== Views.SignOn) && ($location.path() !== Views.ConfirmSignOn);
            };
            scope.$location = $location;
            scope.navigateTo = view => $location.path(view);
            scope.logout = () => {
                UserService.logout();
                $location.path(Views.SignOn);
            };
        }
    }
}];
/**
 * Created by ben on 12/17/15.
 */

const DirectivesModule =
    angular.module('RedditChat.Directives', [])
        .directive('navBar', NavBar)
        .directive('authWebView', AuthWebView);
/**
 * Created by ben on 12/12/15.
 */
'use strict';

let AuthService = ['Storage','Logger','AuthAPI','$http','UserService', (Storage,Logger, AuthAPI, $http,UserService) => {
    let service = {};

    service.getOauthUrl = _ => {
        return new Promise((resolve,reject) => {
            $http.get(AuthAPI.InitialReqUrl).then((res) => resolve(res.data));
        });
    };

    service.getAccessToken = code => {
        return new Promise((resolve,reject) => {
            $http.put(AuthAPI.AccessTokenUrl,{"code":code}).then((res) => {
                $http.get(AuthAPI.AccessTokenUrl).then((res) => {
                    UserService.login().then((res) => {
                        resolve(res);
                    });
                });
            });
        });
    };

    return service;
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
 * Created by ben on 12/17/15.
 */
let UserService = ['UserAPI','Storage','$http', (UserAPI,Storage,$http) => {
    "use strict";

    let service = {};

    service.login = () => {
        return new Promise((resolve,reject) => {
            $http.post(UserAPI.LoginUrl,{}).then((resp) => {
                service.setUser(resp.data).then(() => {
                    resolve(resp.data);
                });
            });
        });
    };

    service.logout = () => {
        return new Promise((resolve,reject) => {
            $http.post(UserAPI.LogoutUrl,{}).then((resp) => {
                Storage.Local.get(Storage.UserKey, (data) => {
                    delete data[Storage.UserKey];
                    Storage.Local.set(data);
                });
                resolve(resp);
            });
        });
    };

    service.getLoginStatus = () => {
        return $http.get(UserAPI.StatusUrl);
    };

    service.setUser = (user) => {
        let data = {};
        data[Storage.UserKey] = user;
        return new Promise((resolve,reject) => {
            Storage.Local.set(data, () => { resolve() });
        });
    };

    service.getUser = () => {
        return new Promise((resolve,reject) => {
            Storage.Local.get(Storage.UserKey, (data) => {
                resolve(data[Storage.UserKey]);
            });
        });
    };

    return service;
}];
/**
 * Created by ben on 12/17/15.
 */

const ServicesModule =
    angular.module('RedditChat.Services', [])
        .factory('AuthService', AuthService)
        .factory('UserService', UserService)
        .factory('Logger', Logger)
        .service('SignalR', SignalR);