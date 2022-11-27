

var fs = require('fs'),
    storageUtil = require('./storageUtil');


function getCurrentDirectoryName() {
    var fullPath = process.execPath;
    var path = fullPath.split(/\\/g);
    var exeName = path[path.length-1];

    var cwd = fullPath.replace(exeName,"");
    console.log("cwd = ", cwd);
    return cwd;
}

// CONSTS
var STORAGE_JSON_PATH = getCurrentDirectoryName() + '/storage.json';
var TRAY_STORAGE_JSON_PATH = getCurrentDirectoryName() + '/tray_storage.json';
console.log(STORAGE_JSON_PATH);

// Module Vars
var storage = {};
var tray_storage = {};
var dataArr = [];

/**
 * @method loadStorage
 * @private
 */

function loadStorage(callback) {

    //TODO - un-comment (currently always loading so that the file can be changed from the outside)

    /* 
    if (storage) {
        return callback(storage);
    }*/

    storageUtil.loadJSON(STORAGE_JSON_PATH, function(err, data) {
        if (err) {
            console.log('[storage] Error loading storage json:', err);
            storage = {};
        } else {
            storage = data;
        }
        console.log('[storage] local storage:', storage);
        callback(storage);
    });
}


/**
 * @method loadTrayStorage
 * @private
 */

function loadTrayStorage(callback) {

    //TODO - un-comment (currently always loading so that the file can be changed from the outside)
    storageUtil.loadJSON(TRAY_STORAGE_JSON_PATH, function(err, data) {
        if (err) {
            console.log('[tray_storage] Error loading storage json:', err);
            tray_storage = {};
        } else {
            tray_storage = data;
        }
       // console.log('[tray_storage] local storage:', tray_storage);
        callback(tray_storage);
    });
}

/**
 * @method saveStorage
 * @private
 */

function saveStorage(callback) {

    storageUtil.saveJSON(STORAGE_JSON_PATH, storage, function(err) {
        if (err) {
            console.log('[storage] saving storage json error: ', err);
            callback(err);
        }
        console.log('[storage] saving storage json: ', storage);
        callback(storage);
    });
}

/**
 * @method saveStorage
 * @private
 */

function saveTrayStorage(callback) {
    storageUtil.saveJSON(TRAY_STORAGE_JSON_PATH, tray_storage, function(err) {
        if (err) {
            console.log('[tray_storage] saving storage json error: ', err);
            callback(err);
        }
        //console.log('[tray_storage] saving storage json: ', tray_storage);
        callback(tray_storage);
    });
}

/**
 * @method get
 * @public
 *
 * Get data from file
 */

function get(params, callback) {
    /*console.log('[storage] get. params:', params);
    var res = {};
    res[params.key] = storage[params.key];
    callback(res);*/

    console.log('[storage] get. params:', params);
    loadStorage(function(storage) {
        // build results dictionary
        var res = {};
        res[params.key] = storage[params.key];
        callback(res);
    });
}

/**
 * @method getTrayStorage
 * @public
 *
 * Get data from file
 */

function getTrayStorage(params, callback) {
    //console.log('[tray_storage] get. params:', params);
    loadTrayStorage(function(tray_storage) {
        // build results dictionary
        var res = {};
        res[params.key] = tray_storage[params.key];
        callback(res);
    });
}

/**
 * @method set
 * @public
 *
 * Sets it in memory first, then writes to file
 */

function set(params, callback) {
    /*console.log('[storage] set. params:', params);
    var data = {};
    //data[params.key] = params.value;
    data.key = params.key;
    data.value = params.value;
    dataArr.push(data);
    callback(storage);*/


    console.log('[storage] set. params:', params);
    loadStorage(function(storage) {
        storage[params.key] = params.value;
        saveStorage(callback);
    });
}

/**
 * @method setTrayStorage
 * @public
 *
 * Sets it in memory first, then writes to file
 */

function setTrayStorage(params, callback) {
    console.log('[tray_storage] set. params:', params);
    loadTrayStorage(function(tray_storage) {
        tray_storage[params.key] = params.value;
        saveTrayStorage(callback);
    });
}


function storageManager()
{
    //first we need to load storage
    loadStorage(function(storage) {
        console.log('[storage] loaded successfully : ', storage);
    });
    setInterval(function(){

       /* if(dataArr.length > 0)
        {
            for (var i = 0; i < dataArr.length; i++)
            {
                var params = dataArr[i];
                console.log('params ==================:', params);
                storage[params.key] = params.value;
            }
            dataArr = [];
            saveStorage(function(storage){
                console.log('[storage] set. storage:', storage);
            });
        }*/

        var params = dataArr.shift();
        while(params)
        {
            console.log('params ==================:', params);
            storage[params.key] = params.value;
            params = dataArr.shift();
        }
        saveStorage(function(storage){
            console.log('[storage] set. storage:', storage);
        });


    },1000);
}

//storageManager();

module.exports = {
    get: get,
    set: set,
    getTrayStorage: getTrayStorage,
    setTrayStorage: setTrayStorage
};
