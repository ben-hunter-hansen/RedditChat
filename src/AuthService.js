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