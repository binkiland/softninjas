/* Hotkeys */

var hotkeys = 
[
	{
		key : "Alt+Left",
	    active : backActiveTab
	},
	{
		key: 'Alt+Right',
		active: forwardActiveTab
	},
	{
		key: 'F5',
		active: refreshActiveTab
	},
	/*{
		key: 'Ctrl+R',
		active: refreshActiveTab
	},*/
	{
		key: 'Alt+Home',
		active: function()
		{
			navigateTab(HOMEPAGE)
		}
	},
	{
		key: 'Ctrl+N',
		active: function()
		{
			createTab(HOMEPAGE);
		}
	},
	{
		key: 'Ctrl+Shift+Tab',
		active: function()
		{
			$('.sidetab .active').parent().prev('.sidetab').first().click();
		}
	},
	{
		key: 'Ctrl+Up',
		active: function()
		{
			$('.sidetab .active').parent().prev('.sidetab').first().click();
		}
	},
	{
		key: 'Ctrl+Tab',
		active: function()
		{
			$('.sidetab .active').parent().next('.sidetab').first().click();
		}
	},
	{
		key: 'Ctrl+Down',
		active: function()
		{
			$('.sidetab .active').parent().next('.sidetab').first().click();
		}
	},
	{
		key: 'Ctrl+F4',
		active: function()
		{
			$('.sidetab .active').trigger('contextmenu');
		}
	}

];

function initHotkeys()
{
	for (var hk = 0; hk < hotkeys.length; hk++)
	{
		var shortcut = new nw.Shortcut(hotkeys[hk]);
		nw.App.registerGlobalHotKey(shortcut);
	}
};

$(document).ready(initHotkeys);