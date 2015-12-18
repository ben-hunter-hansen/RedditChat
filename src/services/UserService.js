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