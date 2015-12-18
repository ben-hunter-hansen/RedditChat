/**
 * Created by ben on 12/17/15.
 */

const ServicesModule =
    angular.module('RedditChat.Services', [])
        .factory('AuthService', AuthService)
        .factory('UserService', UserService)
        .factory('Logger', Logger)
        .service('SignalR', SignalR);