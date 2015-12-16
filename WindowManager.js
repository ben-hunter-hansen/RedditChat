/**
 * Created by ben on 12/15/15.
 */
chrome.app.runtime.onLaunched.addListener(function() {

    // Center window on screen.
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width = 500;
    var height = 400;

    chrome.app.window.create('resources/main.html', {
        id: "RedditChat",
        outerBounds: {
            width: width,
            height: height,
            left: Math.round((screenWidth-width)/2),
            top: Math.round((screenHeight-height)/2)
        }
    });
});