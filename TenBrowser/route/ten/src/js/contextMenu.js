/* Right Click Context Menus */
var bWnd = nw.Window.get();

var contextMenuArea = null;

var shellContextMenu = new nw.Menu();
var shellContextMenuItems = 
[
	{
		label: 'Back',
		click: backActiveTab
	},
	{
		label: 'Forward',
		click: forwardActiveTab
	},
	{
		label: 'Reload',
		click: refreshActiveTab
	},
	{
		type: 'separator'
	},
	{
		label: 'Print',
		click: printActiveTab
	},
	{
		label: 'Inspect',
		click: inspectActiveTab
	}
];

function initContextMenus()
{
	for (var scmi = 0; scmi < shellContextMenuItems.length; scmi++)
	{
		shellContextMenu.append(new nw.MenuItem(shellContextMenuItems[scmi]));
	}

	contextMenuArea = bWnd.window.document.getElementById('views');
};

function enforceContextMenus()
{
	// Block Default Context Menu
	bWnd.window.document.body.addEventListener('contextmenu', function(e){
		// Disable Default Context Menu
		e.preventDefault();
		return false;
	});
};

$(document).ready(enforceContextMenus);
$(document).ready(initContextMenus);

/*function overrideContextMenusAction(event)
{
	// Identify Right-Click
	if (event.which == 3)
	{
		// Disable Default Context Menu
		event.preventDefault();

		// Replace with custom context menu
		shellContextMenu.popup(event.x, event.y);
		return false;
	}
};

// Only enable context menu on WebView portion of the screen
function overrideContextMenus()
{
	// Override Default Context Menu
	var currentContextArea = contextMenuArea.getElementsByClassName('active');
	if (currentContextArea && currentContextArea.length)
	{
		currentContextArea[0].removeEventListener('mousedown', overrideContextMenusAction);
		currentContextArea[0].addEventListener('mousedown', overrideContextMenusAction);
	}
};

var contextMenuObserver = null;
function syncContextMenus()
{
	if (contextMenuObserver)
	{
		contextMenuObserver.disconnect();
	}

	contextMenuObserver = new MutationObserver(function(mutations){
		mutations.forEach(function(mutation){
			console.log('Detected Tab Change in View', tab.view);
			// Override Context Menus
			overrideContextMenus();
		});
	});

	var config = {attributes:false, childList: true, characterData: false}

	contextMenuObserver.observe(contextMenuArea, config);
};

$(document).ready(overrideContextMenus);
$(document).ready(syncContextMenus);
*/