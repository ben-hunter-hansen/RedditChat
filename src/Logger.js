/**
 * Created by ben on 12/14/15.
 */
let Logger = [() => {
    let service = {};

    service.log  = (msg) => console.log(msg);
    service.debug = (msg) => console.debug(msg);
    service.warn = (msg) => console.warn(msg);
    service.error = (msg) => console.error(msg);
    return service;
}];