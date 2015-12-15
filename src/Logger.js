/**
 * Created by ben on 12/14/15.
 */
let Logger = [() => {
    let service = {},
        background = chrome.extension.getBackgroundPage();

    service.log  = (msg) => background.console.log(msg);
    service.debug = (msg) => background.console.debug(msg);
    service.warn = (msg) => background.console.warn(msg);
    service.error = (msg) => background.console.error(msg);
    return service;
}];