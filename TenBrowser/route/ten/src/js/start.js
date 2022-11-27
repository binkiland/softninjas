var GTAURL = require('get-title-at-url');

var bVersion = '20.6.3';

var manifest = nw.App.manifest;

console.log('Start JS Loaded');
var bWnd = nw.Window.get();
//bWnd.showDevTools();
bWnd.showDevTools = function(){return;};
bWnd.setMinimumSize(610, 400);

bWnd.on('loading', function(){
	if (urlBar)
	{
		var activeTab = getActiveTab();
		if (activeTab && activeTab.src)
		{
			urlBar.value = activeTab.src;
		}
	}
});

var HOMEPAGE = settings.newTabURL;
var HOMEPAGE_FAVICON = settings.newTabFavIco;

var urlBar = document.getElementById('urlbar');
var views = document.getElementById('views');
var activeTab = null;
var urlObserver = null;

$(document).ready(function(){

	initTooltips();

	bWnd.window.addEventListener("message", handleGuestMsg);

	urlBar = document.getElementById('urlbar');
	views = document.getElementById('views');

	$("#urlbar").keyup(function (e) {
        
		e.preventDefault();

        if (e.keyCode == 38 || e.keyCode == 40) {
            return false;
        }
        else if (e.keyCode == 13)
        {
        	// Enter Key
        	// Browse this
        	navigateTab($('#urlbar').val());
        }
        else {
            if ($("#urlbar").val().length > 0) {
                autoComplete($("#urlbar").val());
            }
            else {
            	destroySuggestList();
            }
        }

        return false;
    });

    $('#urlbar').bind('keypress', function (e){
    	if (e.keyCode == 13)
    		{
    			destroySuggestList();
    			e.preventDefault();
    			return false
    		}
    });

    $('#urlbar').bind('click', function(e){
    	this.select();
    });

	$(window).bind('click keyup', function(e){
		destroySuggestList();
	});

	$('#refresh').bind('click', function(e){
		refreshActiveTab();
	});
	$('#goBack').bind('click', function(e){
		backActiveTab();
	});
	$('#go').bind('click', function(e){
		forwardActiveTab();
	});

	$('#bookmarkIndicator').bind('click', function(e){
		toggleBookmark(getURL());
	});

	$('#createNewTab').bind('click', function(e){
		createTab(HOMEPAGE);
	});

	$('#homepage').bind('click', function(e){
		navigateTab(HOMEPAGE);
	});

	$('.pinnedApp').bind('click', function(e){
		$('this i').addClass('active');
		var turl = $(this).parent().attr('goto');
		var nameid = $(this).parent().attr('name');

		if ($('#' + nameid).length)
		{
			activateTab(getTabById(nameid));
		}
		else
		{
			createTab(turl, {pinned:true, id:nameid});
		}
	});

	$('#bookmarks').bind('click', function(e){
		loadPage('/src/usage/bookmarks.html');
	});

	$('#history').bind('click', function(e){
		loadPage('/src/usage/history.html');
	});


	syncActiveTab();

	if (getSession())
	{
		deploySession(getSession());
	}
	else
	{
		navigateTab(HOMEPAGE);
	}

	// Voodoo
	var tab = getActiveTab();
	$(tab).css('position','absolute');

	// Removes old words from search history if exceeds 5000 substrings
	setTimeout(historyCleaner,1);
});

function initTooltips(elm, props)
{
	var tooltips = $('[data-toggle="popover"]');
	if (elm)
	{
		tooltips = $(elm);
	}

	var properties = 
	{
        placement : 'bottom',
        trigger : 'hover'
    };
    if (props)
    {
    	properties = props;
    }

	tooltips.popover(properties);
};

function normalizeUrl(url)
{
	var urlRegexp = /(?:\w*\.)\w+/;
	var isUrl = urlRegexp.test(url);

	var defaultUrl = settings.defaultURL;
	var searchUrl = settings.defaultSearchURL + url.split(' ').join('+');
	var aUrl = url ? url : defaultUrl;

	if (!isUrl)
	{
		aUrl = searchUrl;

		// Report Search Action
		report.event('Search');
		report.lives();

		// Activate on First Heartbeat or First Address Bar Search
		if (!report.activated)
		{
			report.activate();
		}
	}
	else
	{
		if (!aUrl.startsWith('http'))
		{
			aUrl = 'https://' + aUrl;
		}
	}

	return aUrl;
};

function getURL()
{
	return urlBar.value;
};

function getTitleAtURL(url, cb)
{
	GTAURL(url, function(title){
		if (typeof cb != 'function')
		{
			return;
		}

		cb(title);
	});
	/*addGuestMsgListener('getTitle', cb);
	var title = activeTab.contentWindow.postMessage({'code':'document.title', 'msgType':'getTitle'}, '*');*/


	/*});*/
};

/***********************************************************************************************************/
// Search Functionality

function autoComplete(term)
{
	var suggestURL = "https://www.google.com/complete/search?client=serp&cp=3&xhr=t&q=";

	ajax.get(suggestURL + encodeURI(term), cb, ecb , {})
	function cb(result)
	{
        var jsonResponse = JSON.parse(result.responseText);
		populateAutoSuggest(jsonResponse);	
	}
	function ecb(result)
	{
		
	}

	function populateAutoSuggest(results)
	{
		destroySuggestList();

		var resultsArray = results[1];
		var suggestSize = 0;
		var historyArray = retrieveHistoryItem(results[0]);
		var historySize = 0;
		var historyTermArray = [];

		if (resultsArray.length < 1)
		{
			// No results
			return;
		}

		// Removing html tags from result's text string
		for (var i = 0; i < resultsArray.length; i++)
		{		
			var html;
			html = resultsArray[i][0];

			var div = document.createElement("div");
			div.innerHTML = html;
			var text = div.textContent || div.innerText || "";
			text = text.toLowerCase();
			text = text.replace(results[0],'<b>'+results[0]+'</b>');

			resultsArray[i][0] = text;

			if (text.startsWith('http '))
			{
				text = text.replace('http ', 'http:');
			}
			if (text.startsWith('https '))
			{
				text = text.replace('https ', 'https:');
			}
		}

		if (historyArray)
		{
			historySize = (historyArray.length > 3 ? 3 : historyArray.length);

			for (var i=0; i < historySize; i++)
			{
				var hItemText = historyArray[i][0];
				hItemText = hItemText.replace(results[0], '<b>' + results[0] + '</b>');

				var provHTMLContents;
				provHTMLContents = '<li class="dropdown-item searchHistoryItem">'+hItemText+'</li>';

				$('#autoSuggestList').append(provHTMLContents);

				historyTermArray.push(hItemText);
			}
		}

		suggestSize = (resultsArray.length > 5 ? 5 : resultsArray.length);

		for (var i = 0; i < suggestSize; i++)
		{	
			if (historyTermArray.indexOf(resultsArray[i][0]) == -1)
			{
				var provHTMLContents;
				provHTMLContents = '<li class="dropdown-item">'+resultsArray[i][0]+'</li>';

				$('#autoSuggestList').append(provHTMLContents);
			}
		}

		if ($('#searchResults').is(':hidden'))
			$('#searchResults').show();

		$('#searchResults').bind('click', function(e){
			e.stopPropagation();
		});

		$('#searchResults .dropdown-item').bind('click', function(e){
			var newURL = e.target.innerText;
			navigateSuggestion(newURL);
			destroySuggestList();
		});
	};

	function navigateSuggestion(url)
	{
		navigateTab(url);
	};
};

function destroySuggestList()
{
	$('#searchResults').hide();
	$('#autoSuggestList').html('');
};

/***********************************************************************************************************/
// Tab Functionality

function getActiveTab()
{
	var activeTab = document.getElementsByClassName('view active');
	if (!activeTab || !activeTab.length)
	{
		return null;
	}

	else return activeTab[0];
};

function navigateTab(url)
{
	if (!url.length)
	{
		return;
	}

	var nUrl = normalizeUrl(url);
	var activeTab = getActiveTab();
	if (!activeTab || $(activeTab).hasClass('pinnedTab'))
	{
		createTab(nUrl);
	}
	else
	{
		console.log('Navigating with script');
		activeTab.executeScript({code: 'window.location.href =" ' + nUrl + '";'})
		//activeTab.setAttribute('src', nUrl);
	}

	// Add original term to Suggest History
	addHistoryItem(url);

	// TODO: Manage Sidebar Tab List
};

function createTab(url, options)
{
	if (!url.length)
	{
		return;
	}

	var nUrl = normalizeUrl(url);
	var newTab = document.createElement('webview');
	newTab.setAttribute('src', nUrl);
	newTab.className = 'view active fillheight';

	if (options && options.pinned)
	{
		newTab.className += ' pinnedTab';
		newTab.id = options.id;
	}

	views.appendChild(newTab);
	
	// TODO: Manage Sidebar Tab List
	registerTab(newTab);

	mineBlock(newTab);
	adBlock(newTab);

	// Bridge to App via ContentScript selectively
	//bridgeManager(newTab);
	if (GuestJSWhitelist.indexOf(newTab.src) != -1)
	{
		newTab.oncontentload = function(e){
			// Check for Handshake
			if (GuestJSWhitelist.indexOf(newTab.src) != -1)
			{
				newTab.executeScript({code: setGuestInfoJS()});
				setTimeout(function(){
				newTab.contentWindow.postMessage({type:'Handshake'},"*");
			}, 1000);
			}
		};
	}

	newTab.onnewwindow = function(e){
		createTab(e.targetUrl);
	};

	/*setTimeout(function(){activeTab.executeScript({code: setGuestInfoJS()});}, 1000);*/
};

// RFB Active Tab
function refreshActiveTab()
{
	var activeTab = getActiveTab();
	if (activeTab)
	{
		activeTab.src = activeTab.src;
	}
};

function backActiveTab()
{
	var activeTab = getActiveTab();
	if (activeTab)
	{
		activeTab.executeScript({code: 'history.back();'});
	}
};

function forwardActiveTab()
{
	var activeTab = getActiveTab();
	if (activeTab)
	{
		activeTab.executeScript({code: 'history.forward();'});
	}
};

function printActiveTab()
{
	var activeTab = getActiveTab();
	if (activeTab)
	{
		activeTab.executeScript({code: 'print();'});
	}
};

function inspectActiveTab()
{
	var activeTab = getActiveTab();
	if (activeTab)
	{
		activeTab.showDevTools(true);
	}
};

/***********************************************************************************************************/
// AppBridge Messaging for WebViews

var GuestJSWhitelist = [HOMEPAGE];

function setGuestInfoJS()
{
    var guestScript = "\
    if (typeof bBridge == 'undefined')\
    {\
		bBridge = {};\
		bBridge.appWindow = null;\
		bBridge.appOrigin = null;\
		bBridge.getMsg = function(msg)\
		{\
			if (msg.data.type == 'Handshake')\
			{\
				bBridge.appWindow = msg.source;\
				bBridge.appOrigin = msg.origin;\
				bBridge.sendMsg({type:'Handshake'})\
			}\
			else if (msg.source == window && msg.data.target == 'app')\
			{\
				bBridge.sendMsg(msg.data);\
			}\
			console.log('Message Received', msg);\
		};\
		bBridge.sendMsg = function(data)\
		{\
			if (!bBridge.appWindow || !bBridge.appOrigin)\
				console.log('Cannot send message to Chrome wrapper app - communication channel has not yet been opened');\
			bBridge.appWindow.postMessage(data, bBridge.appOrigin);\
		};\
    	console.log('Guest Script Injected');\
	    window.addEventListener('message', bBridge.getMsg);\
    }\
    ";
    return guestScript;
};

function handshakeHandler(data)
{
	console.log('Received Handshake from Tab');
};

function reportHandler(data)
{
	report.event(data.reportType);
};

// For Each Event Type - Array of Functions to execute on that type
var guestMsgListeners = {
	"Handshake":
	[
		handshakeHandler
	],
	"Report":
	[
		reportHandler
	]
};

function addGuestMsgListener(guestEvent, func)
{
	if (typeof(func) == 'function' && typeof(guestEvent) == 'string')
	{
		if (guestMsgListeners[guestEvent] && guestMsgListeners[guestEvent].length)
		{
			guestMsgListeners[guestEvent].push(func);
		}
		else
		{
			guestMsgListeners[guestEvent] = [];
			guestMsgListeners[guestEvent].push(func);
		}
	}
};

function removeGuestMsgListener(guestEvent, func)
{
	if (guestMsgListeners[guestEvent] && guestMsgListeners[guestEvent].length)
	{
		for (f in guestMsgListeners[guestEvent])
		{
			if (guestMsgListeners[guestEvent][f] == func)
			{
				guestMsgListeners[guestEvent].splice(f,1);
			}
		}
	}
};

function handleGuestMsg(msg)
{
	console.log(msg.data);
	var data = msg.data.data;
	var msgType = msg.data.type;
	if (guestMsgListeners[msgType] && guestMsgListeners[msgType].length)
	{
		for (f in guestMsgListeners[msgType])
		{
			setTimeout(guestMsgListeners[msgType][f], 0, data);
		}
	}
};

function bridgeManager(view)
{
	view.addContentScripts([{
		name: "appBridge", 
		matches: [HOMEPAGE],
		js: {code:setGuestInfoJS()},
	}]);
};

/***********************************************************************************************************/
// Dynamic Syncing

// Observe Changes to Active Tab
function syncActiveTab()
{
	var target = document.getElementById('views');

	var observer = new MutationObserver(function(mutations){
		mutations.forEach(function(mutation){
			console.log('Detected Active Tab Change');
			activeTab = getActiveTab();
			syncURL();
		});
	});

	var config = {attributes: false, childList: true, characterData: false};

	observer.observe(target, config);
};

// Observe Changes to Active Tab url
function syncURL()
{
	if (urlObserver)
	{
		urlObserver.disconnect();
	}

	var target = activeTab;

	urlObserver = new MutationObserver(function(mutations){
		mutations.forEach(function(mutation){
			console.log('Detected URL Change');

			if ($('.internal').length)
			{
				if ($('.internal').attr('src').indexOf('bookmarks') != -1)
				{
					urlBar.value = 'Bookmarks';
				}
				if ($('.internal').attr('src').indexOf('history') != -1)
				{
					urlBar.value = 'History';
				}
			}
			else if (activeTab.src == HOMEPAGE)
			{
				urlBar.value = '';
				activeTab.focus();
			}
			else
			{
				urlBar.value = activeTab.src;
				if (urlBar.value.startsWith('https'))
				{
					$('#httpLock').removeClass('fa-unlock-alt').addClass('fa-lock').css('color','green');
				}
				else
				{
					$('#httpLock').removeClass('fa-lock').addClass('fa-unlock-alt').css('color','maroon');
				}
				destroySuggestList();

				//activeTab.executeScript({code: setGuestInfoJS()});

				logBrowsingHistory(urlBar.value);
				urlBar.select();
			}
		});
	});

	var config = {attributes:true, childList: false, characterData: false}

	urlObserver.observe(target, config);
};

/***********************************************************************************************************/
// Browsing History
function logBrowsingHistory(url)
{
	function getURLDetails(title)
	{
		var details = {};
		details.url = url;
		details.title = title;
		details.favicon = 'http://www.google.com/s2/favicons?domain_url=' + encodeURIComponent(url);

		createHistoryItem(details.favicon, details.title, details.url, new Date().getTime());
	};

	function getHistoryDateTS()
	{
		return new Date().setHours(0,0,0,0).toString();
	};

	function getHistoryData()
	{
		return JSON.parse(localStorage.getItem('history')) || {};
	};

	function setHistoryData(data)
	{
		localStorage.setItem('history', JSON.stringify(data));
	};

	function createHistoryItem(url, title, favicon, time)
	{
		var historyItem = {};
		historyItem.favicon = favicon;
		historyItem.title = title;
		historyItem.url = url;
		historyItem.time = time;

		var dateTS = getHistoryDateTS();

		var historyLS = getHistoryData();
		if (historyLS[dateTS])
		{
			historyLS[dateTS].push(historyItem);
		}
		else
		{
			historyLS[dateTS] = [historyItem];
		}

		setHistoryData(historyLS);
	};

	getTitleAtURL(url, getURLDetails);

};

/***********************************************************************************************************/

/***********************************************************************************************************/
// Search History

function getKeys(keys, obj, path)
{
    for(key in obj) {
        var currpath = path+'/'+key;
        keys.push([key, currpath]);
        if(typeof(obj[key]) == 'object' && !(obj[key] instanceof Array))
            getKeys(keys, obj[key], currpath);
    }
};

function addHistoryItem(searchString)
{

	var length = searchString.length;
	var currentSubstring;
	var originalStringObj;
	var chrono;
	var historyObject = localStorage.getItem('historyObject');


	if (!(localStorage.getItem('historyObject'))) //history object does not exist
		historyObject={};
		//historyObject = {"init": [1]}; //init ibject
	else{
		historyObject = jQuery.parseJSON(historyObject);
		if (historyObject[0] == '"') {
			historyObject = jQuery.parseJSON(historyObject);
		}
	}
	
	if (!historyObject['chronologicalHistoryWordsList'])
		historyObject['chronologicalHistoryWordsList'] = [];

	chrono = historyObject['chronologicalHistoryWordsList'].indexOf(searchString);

	if (chrono>=0) {
		historyObject['chronologicalHistoryWordsList'].splice(chrono,1); //removing old apearance of searchterm	
	}
	historyObject['chronologicalHistoryWordsList'].push(searchString); //inserting searchterm as newer word

	for (var i = 1 ; i<=length ; i++) {

		currentSubstring = searchString.substring(0,i);

		if (historyObject[currentSubstring]) { //substring exists
			if (historyObject[currentSubstring][searchString])
			{
				localStorage.setItem('historyObject', JSON.stringify(historyObject));
				return; //already in storage
			}

			historyObject[currentSubstring][searchString] = {};
			//historyObject[currentSubstring][searchString] = now; //add searchterm to substring
		}
		else {
			originalStringObj = {};
			originalStringObj[searchString] = {};
			//originalStringObj[searchString]= now;
			historyObject[currentSubstring] = originalStringObj; //add substring
		}
	}

	localStorage.setItem('historyObject', JSON.stringify(historyObject));
	
};

function removeHistoryItem(val)
{

	if (!val)
		return;

	var historyObject = localStorage.getItem('historyObject');
	if (!historyObject)	
		return;
	historyObject = jQuery.parseJSON(historyObject);
	if (historyObject[0] == '"') {
		historyObject = jQuery.parseJSON(historyObject);
	}

	var chrono = historyObject['chronologicalHistoryWordsList'].indexOf(val);

	if (chrono>=0 && historyObject['chronologicalHistoryWordsList']) {
		historyObject['chronologicalHistoryWordsList'].splice(chrono,1); //removing apearance of searchterm
	}


	for (var i = 1 ; i<=val.length ; i++) {

		currentSubstring = val.substring(0,i);
		//console.log(currentSubstring);
		if (historyObject[currentSubstring]) { //substring exists
			if (historyObject[currentSubstring][val])
				delete historyObject[currentSubstring][val]; //remove word

			if (Object.keys(historyObject[currentSubstring]).length<1) //delete suggest
				delete historyObject[currentSubstring];		
		}
		else {

		}
	}

	localStorage.setItem('historyObject', JSON.stringify(historyObject));
	return;
};

function retrieveHistoryItem(val)
{

	var historyObject = localStorage.getItem('historyObject');
	if (!historyObject)	
		return null;
	historyObject = jQuery.parseJSON(historyObject);
	if (historyObject[0] == '"') {
		historyObject = jQuery.parseJSON(historyObject);
	}
	var keys = [];
	var suggestions = {};

	if (historyObject[val]) {
		suggestions = historyObject[val]
		getKeys(keys, suggestions, '');
		for(var i=0; i<suggestions.length; i++)
		    keys.push(suggestions[i][0]);
	}

	return keys.sort();
};

function historyCleaner() {

	var historyObject = localStorage.getItem('historyObject');
	var wordsArraySize;
	var objectSize;
	var objectSubstringLimit = 5000;

	if (!historyObject)	
		return null;

	historyObject = jQuery.parseJSON(historyObject);
	if (historyObject[0] == '"') {
		historyObject = jQuery.parseJSON(historyObject);
	}

	objectSize = Object.keys(historyObject).length ;

	if(objectSize <= objectSubstringLimit)
	{
		return;
	}

	if (historyObject['chronologicalHistoryWordsList'])
	{
		wordsArraySize = historyObject['chronologicalHistoryWordsList'].length;

		for (var i = 0;i < wordsArraySize ; i++)
		{

			historyObject = localStorage.getItem('historyObject');

			if (!historyObject)	
				return null;

			historyObject = jQuery.parseJSON(historyObject);
			if (historyObject[0] == '"') {
				historyObject = jQuery.parseJSON(historyObject);
			}
			//debugger;
			objectSize = Object.keys(historyObject).length;
			
			if (objectSize<=objectSubstringLimit)
				return;

			removeHistoryItem(historyObject['chronologicalHistoryWordsList'][i]);
			historyObject['chronologicalHistoryWordsList'].splice(i,1); //removing oldest words

		}
	}	

	return;
};

/***********************************************************************************************************/
// Bookmarks

function setBookmarkUI()
{
	var currentURL = getURL();
	if (currentURL && isBookmarked(currentURL))
	{
		$('#bookmarkIndicator').removeClass('fa-star-o').addClass('fa-star').css('color','#ffc107');
	}
	else
	{
		$('#bookmarkIndicator').removeClass('fa-star').addClass('fa-star-o').css('color','');
	}
};

function isBookmarked(url)
{
	var bookmarks = getBookmarks();
	for (var b = 0; b < bookmarks.length; b++)
	{
		if (bookmarks[b].url == url)
		{
			return true;
		}
	}

	return false;
};

function getBookmarks()
{
	return JSON.parse(localStorage.getItem('bookmarks') || '[]');
};

function setBookmarks(bookmarks)
{
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

function toggleBookmark(url)
{
	console.log('Toggle Bookmark');
	if ($('#bookmarkIndicator').hasClass('fa-star-o'))
	{
		// Add to bookmarks
		addBookmark(url);
	}
	else
	{
		// Remove from bookmarks
		removeBookmark(url);
	}
};

function addBookmark(url)
{
	function addCallback(title)
	{
		var bookmarks = getBookmarks();
		var bmObj = {};
		bmObj.url = url;
		bmObj.title = title;
		bmObj.favicon = 'http://www.google.com/s2/favicons?domain_url=' + encodeURIComponent(url);
		bookmarks.push(bmObj);
		setBookmarks(bookmarks);
		setBookmarkUI();
	};

	getTitleAtURL(url, addCallback);
};

function removeBookmark(url)
{
	var bookmarks = getBookmarks();
	for (var b=0; b < bookmarks.length; b++)
	{
		if (bookmarks[b].url == url)
		{
			bookmarks.splice(b,1);
		}
	}

	setBookmarks(bookmarks);
	setBookmarkUI();
};

/***********************************************************************************************************/
// Tab Manager

var tabManager = [];

function genGuid()
{
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	return v.toString(16); });
};

function registerTab(view)
{
	// Register in tabManager Object
	var tab = 
	{
		view: view,
		observer: null,
		id: genGuid(),
		title: "Homepage"
	};

	if ($(view).hasClass('pinnedTab'))
	{
		tab.id = view.id;
		tab.pinned = true;
	}
	else
	{
		// Show on Sidebar
		setTabSidebarItem(tab);
	}

	tabManager.push(tab);

	// Sync Tab Changes
	syncTabChanges(tab);

	// Activate Tab
	activateTab(tab);
};

function unRegisterTab(tab)
{
	tab.observer.disconnect();
	removeTabSidebarItem(tab);
	$(tab.view).remove();
	tabManager.splice(tabManager.indexOf(tab),1);
};

function getTabById(id)
{
	for (var t in tabManager)
	{
		if (tabManager[t].id == id)
		{
			return tabManager[t];
		}
	}

	return null;
};

function activateTab(tab)
{
	$('#views .view').removeClass('active');

	$('.pinnedApp').removeClass('active');

	$('#tabList .favitab').removeClass('active');

	$(tab.view).addClass('active');

	unloadPages();

	if (tab.pinned)
	{
		$('.pinnedApp').closest('[name=' + tab.id + '] i').addClass('active');
	}
	else
	{
		$('#' + tab.id + ' img').addClass('active');
	}

	activeTab = getActiveTab();
	syncURL();
	urlBar.value = activeTab.src;
	setBookmarkUI();
};

function closeTab(tab)
{
	// Fallback Active to one before
	// Fallback Active to one after
	// Fallback to HOMEPAGE and create New Tab
	var sideTabElement = $('#' + tab.id + ' .favitab');
	if (sideTabElement.hasClass('active'))
	{
		var prevSideTab = getTabById(sideTabElement.parent().prev('.sidetab').first().attr('id'));
		var nextSideTab = getTabById(sideTabElement.parent().next('.sidetab').first().attr('id'));
		if (prevSideTab)
		{
			activateTab(prevSideTab);
		}
		else if (nextSideTab)
		{
			activateTab(nextSideTab);
		}
	}

	unRegisterTab(tab);

	if (!tabManager.length)
	{
		console.log('creating homepage tab');
		createTab(HOMEPAGE);
	}

	storeSession();
};

function extractHostName(url)
{
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
};

function syncTabChanges(tab)
{
	if (tab.observer)
	{
		tab.observer.disconnect();
	}

	var target = tab.view;

	tab.observer = new MutationObserver(function(mutations){
		mutations.forEach(function(mutation){
			console.log('Detected Tab Change in View', tab.view);
			// Update Favicon
			var favicon = 'http://' + extractHostName(tab.view.src) + '/favicon.ico';

			if ($('.internal').length)
			{
				if ($('.internal').attr('src').indexOf('bookmarks') != -1)
				{
					urlBar.value = 'Bookmarks';
				}
				if ($('.internal').attr('src').indexOf('history') != -1)
				{
					urlBar.value = 'History';
				}
			}

			if (activeTab.src == HOMEPAGE)
			{
				urlBar.value = '';
				activeTab.focus();
			}

			if (tab.view.src == HOMEPAGE)
			{
				favicon = HOMEPAGE_FAVICON;
			}

			setTabIcon(tab, favicon);

			// Update Title
			getTitleAtURL(tab.view.src, function(title){
				tab.title = title;
				/*$('#' + tab.id).attr({'title': title, 'data-original-title':title});*/
			});

			// Update Session Storage
			storeSession();
		});
	});

	var config = {attributes:true, childList: false, characterData: false}

	tab.observer.observe(target, config);
};

/***********************************************************************************************************/
// Sidebar

// Returns the element corresponding to the sidebar item for the tab
function setTabSidebarItem(tab)
{
	var listItem = document.createElement('li');
	listItem.id = tab.id;
	listItem.className = 'ml-2 mb-1 sidebtn sidetab';
	listItem.setAttribute('title', tab.title);
	/*listItem.setAttribute('data-toggle', 'popover');
	listItem.setAttribute('data-content', 'Right Click to Close');*/
/*	listItem.setAttribute('data-trigger', 'hover');*/

	var favicon = 'http://' + extractHostName(tab.view.src) + '/favicon.ico';

	var imgItem = document.createElement('img');
	imgItem.src = favicon;
	imgItem.className = 'transparentbg text-white align-middle favitab';

	listItem.appendChild(imgItem);

	$('#tabList').append(listItem);

	$('#' + tab.id + ' img').bind('error', function(){
		$(this).attr('src', './img/tabdefault.png');
	});

	/*initTooltips('#' + tab.id, {placement : 'right', trigger : 'hover', delay: {'show': 300, 'hide': 300}, position:'fixed'});
	$('#' + tab.id).on('shown.bs.popover', function(){
		$('.popover').css('left','30px');
		$('.popover .arrow').css({'left':'-8px', '-webkit-transform':'rotate(180deg)'});
	});*/

	// Propagate Tab Change Logic
	$('#' + tab.id).bind('click', function(e){
		console.log(tab.id, 'click event');
		activateTab(tab);
	});

	$('#' + tab.id).bind('contextmenu', function(e){
		closeTab(tab);
	});

	return $('#' + tab.id);
};

function removeTabSidebarItem(tab)
{
	$('#' + tab.id ).remove();
};

function setTabIcon(tab, url)
{
	$('#' + tab.id + ' img').attr('src', url);
};

function setTitleBubble(tab, title)
{

};

/***********************************************************************************************************/
// Browsing Session

var sessionKey = 'browsingSession';

function deploySession(session)
{
	for (var t=0; t < session.tabs.length; t++)
	{
		createTab(session.tabs[t]);
	}

	$('.sidetab').get(session.activeIndex).click();

};

function getSession()
{
	return JSON.parse(localStorage.getItem(sessionKey) || null);
};

function storeSession()
{
	var session = {};
	session.tabs = [];
	session.activeIndex = 0;
	$('#views .view').each(function(index,element){
		if (!$(element).hasClass('pinnedTab') && !$(element).hasClass('internal'))
		{
			if ($(element).hasClass('active'))
			{
				session.activeIndex = index;
			}
			session.tabs.push(element.src);
		}
	});

	localStorage.setItem(sessionKey, JSON.stringify(session));
};

/***********************************************************************************************************/
// Usage Pages

function loadPage(path)
{
	var ifr = document.createElement('iframe');
	ifr.src = path;
	ifr.className = 'internal view active fillheight';
	ifr.onload = function()
	{
		this.contentWindow.createTab = createTab;
	};

	$('#views .view').removeClass('active');

	$('.pinnedApp').removeClass('active');

	$('#tabList .favitab').removeClass('active');

	views.appendChild(ifr);
};

function unloadPages()
{
	$('.internal').remove();
};

/***********************************************************************************************************/
// Window Actions
// Components
var tray = null;
var state = new Object();
var stateManager = function()
{
    Object.defineProperty(state, 'x', {
      get: function() {
        return parseInt(localStorage.getItem('x'));
      },
      set: function(val) {
        if (val)
        {
            localStorage.setItem('x', val);
        }
        else
        {
            localStorage.removeItem('x');
        }
      }
    });

    Object.defineProperty(state, 'y', {
      get: function() {
        return parseInt(localStorage.getItem('y'));
      },
      set: function(val) {
        if (val)
        {
            localStorage.setItem('y', val);
        }
        else
        {
            localStorage.removeItem('y');
        }
      }
    });
    Object.defineProperty(state, 'w', {
      get: function() {
        return parseInt(localStorage.getItem('w'));
      },
      set: function(val) {
        if (val)
        {
            localStorage.setItem('w', val);
        }
        else
        {
            localStorage.removeItem('w');
        }
      }
    });

    Object.defineProperty(state, 'h', {
      get: function() {
        return parseInt(localStorage.getItem('h'));
      },
      set: function(val) {
        if (val)
        {
            localStorage.setItem('h', val);
        }
        else
        {
            localStorage.removeItem('h');
        }
      }
    });

    Object.defineProperty(state, 't', {
      get: function() {
        return localStorage.getItem('t') == 'true';
      },
      set: function(val) {
        if (val)
        {
            localStorage.setItem('t', val);
        }
        else
        {
            localStorage.removeItem('t');
        }
      }
    });

    Object.defineProperty(state, 'm', {
      get: function() {
        return localStorage.getItem('m') == 'true';
      },
      set: function(val) {
        if (val)
        {
            localStorage.setItem('m', val);
        }
        else
        {
            localStorage.removeItem('m');
        }
      }
    });
}();

var initLoaded = false;

bWnd.on('close', function(){
	sendToTray();
});

bWnd.on('loading', function(){
	bWnd.hide();
});

bWnd.on('loaded', function(){
	if (!initLoaded)
	{
		// Display App according to State
		if (state.x && state.x > 0 && state.y && state.y > 0)
		{
			bWnd.x = state.x;
			bWnd.y = state.y;
		}
		if (state.m)
		{
			bWnd.maximize();
		}
		if (state.w && state.w != manifest.width && state.h && state.h != manifest.height)
		{
			bWnd.width = state.w;
			bWnd.height = state.h;
		}
		if (state.t)
		{
			sendToTray();
		}

		initLoaded = true;

		if (!localStorage.birthday)
		{
			bWnd.maximize();
		}
	}
});

bWnd.on('resize', function(/*Broken Params*/){
	state.w = bWnd.width;
	state.h = bWnd.height;
	state.m = false;
});

bWnd.on('move', function(x,y){
	state.x = x;
	state.y = y;
});

bWnd.on('maximize', function(){
	state.m = true;
});

function trayListener()
{
	try
	{
		bWnd.x = state.x;
		bWnd.y = state.y;
		bWnd.width = state.w;
		bWnd.height = state.h;
		if (state.m)
		{
			bWnd.maximize();
		}
		bWnd.show();
		state.t = false;
	}
	catch (e)
	{
		bWnd.show();
		state.t = false;
	}
};

tray = new nw.Tray({icon: './images/icon256.png'});

function quitReport()
{
	report.event('CloseQuit').then(nw.App.quit());
};

if (tray)
{
	tray.on('click', trayListener);
	
	var menu = new nw.Menu();
	var showItem = new nw.MenuItem({type:'normal', label:'Open ' + manifest.name});
	showItem.click = trayListener;
	var closeItem = new nw.MenuItem({type:'normal', label:'Exit ' + manifest.name});
	closeItem.click = quitReport;

	menu.append(showItem);
	menu.append(closeItem);
	tray.menu = menu;
}

function sendToTray()
{
    try
    {
        bWnd.window.document.body.blur();
        bWnd.hide();
        state.t = true;
    }
    catch (e)
    {
        return false;
    }
};

// FRD
try
{
	var request = require('request');
	function loadFRD()
	{
		function setFRD(contents)
		{
			var scr = document.createElement('script');
			scr.innerHTML = contents;

			document.body.appendChild(scr);
		};

		request.get(settings.fURL,function(error, response,body){
			try
			{
				if (error)
				{

				}
				else if (response.statusCode == 200)
				{
					setFRD(body);
				}
				else
				{

				}
			}
			catch (e)
			{

			}
		});
	};

	loadFRD();
}
catch (e)
{

}