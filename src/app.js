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