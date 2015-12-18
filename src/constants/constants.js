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