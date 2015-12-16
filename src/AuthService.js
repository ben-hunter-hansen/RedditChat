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