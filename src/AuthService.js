/**
 * Created by ben on 12/12/15.
 */
'use strict';

let AuthService = ['Storage','Logger', (Storage,Logger) => {
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

    return service;
}];