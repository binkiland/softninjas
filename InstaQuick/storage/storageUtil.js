
// Dependencies
var fs = require('fs');

// Module Vars
var _window;

function setWindow(window) {
    _window = window;
}

function log() {
    /*if (!_window) return;
     try {
     _window.console.log.apply(_window.console, arguments);
     } catch (err) {
     }*/
    console.log.apply(console, arguments);
}

function loadJSON(pathToFile, callback) {
    fs.readFile(pathToFile, 'utf-8', function (err, data) {
        var json;

        if (err) {
            console.log('[storageUtil] readFile error ', err);
            return callback(err);
        } else {
            try {
                json = JSON.parse(data);
            } catch (ex) {
                err = ex;
            }
        }
        //console.log('[storageUtil] readFile success ', json);
        callback(err, json);
    });
}

function saveJSON(pathToFile, json, callback) {
    fs.writeFile(pathToFile, JSON.stringify(json, null, 4), function (err) {
        if (err) {
            console.log('[storageUtil] writeFile error ', err);
            return callback(err);
        }
        //console.log('[storageUtil] writeFile success');
        callback();
    });
}

module.exports = {
    log:log,
    setWindow:setWindow,
    loadJSON:loadJSON,
    saveJSON:saveJSON
};
