/**
 * Created by ben on 12/17/15.
 */

const DirectivesModule =
    angular.module('RedditChat.Directives', [])
        .directive('navBar', NavBar)
        .directive('authWebView', AuthWebView);