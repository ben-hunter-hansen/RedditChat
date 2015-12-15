/**
 * Created by ben on 12/13/15.
 */
let SignalR = ['$','ChatAPI', ($, ChatAPI) => {
    let service = {},
        connection = {},
        proxy = {};

    service.connect = () => {

        connection = $.hubConnection(ChatAPI.Url, ChatAPI.Config);
        proxy = connection.createHubProxy(ChatAPI.HubName);

        return new Promise((resolve, reject) => {
            connection.start().done(() => {
                resolve({status: "Connected sucessfully"});
            }).fail((err) => {
                reject({status: 'Connection failed', reason: err});
            });
        });
    };

    service.greetAll = (user) => {
        proxy.invoke('greetAll', user);
    };

    return service;
}];