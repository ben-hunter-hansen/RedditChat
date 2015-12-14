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