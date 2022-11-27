$(document).ready(function(){

	searchBox = document.getElementById('searchBox');

    $('#searchBox').focus();
    $('#searchForm').attr('action', settings.newTabSearchURL);

	$("#searchBox").on('keyup',function (e) {
        
		e.preventDefault();

        if (e.keyCode == 38 || e.keyCode == 40) {
            return false;
        }
        else if (e.keyCode == 13)
        {
        	// Enter Key
        	// Browse this
        	navigateTab($('#searchBox').val());
        }
        else {
            if ($("#searchBox").val().length > 0) {
                autoComplete($("#searchBox").val());
            }
            else {
            	destroySuggestList();
            }
        }

        return false;
    });

    $('#searchBox').on('keypress', function (e){
    	if (e.keyCode == 13)
    		{
    			destroySuggestList();
    			e.preventDefault();
    			return false
    		}
    });

    $('#searchBox').on('click', function(e){
    	this.select();
    });

	$(window).on('click keyup', function(e){
		destroySuggestList();
	});

    $('#searchButton').on('click', function(e){
        e.preventDefault();
        if (($('#searchBox').val() != ''))
        {
            navigateTab($('#searchBox').val());
        }
    });
});

function navigateTab(url)
{
    var nUrl = normalizeUrl(url);

    location.href = nUrl;
};

function normalizeUrl(url)
{
	var urlRegexp = /(?:\w*\.)\w+/;
	var isUrl = urlRegexp.test(url);

	var defaultUrl = "https://www.bing.com";
	var searchUrl = settings.newTabSearchURL + url.split(' ').join('+');
	var aUrl = url ? url : defaultUrl;

	if (!isUrl)
	{
		aUrl = searchUrl;

        try
        {
            // Report Search Action via App Bridge
            window.postMessage({type:"Report", target:'app', data:{reportType:"SearchNT"}});
        }
        catch (e)
        {
            console.log('Exception in App Bridge', e, e.stack);
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