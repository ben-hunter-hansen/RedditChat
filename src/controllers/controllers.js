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