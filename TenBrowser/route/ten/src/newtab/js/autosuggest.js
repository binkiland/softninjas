function autoComplete(term)
{
	// Use Custom Service for now
	// When converting to Google Service, all resultsArray[i] calls should be changed to resultsArray[i][0]
	var suggestURL = "https://s.ten-browser.com/suggest/?q=" /*"https://www.google.com/complete/search?client=serp&cp=3&xhr=t&q="*/;

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
		var historyArray = null; //retrieveHistoryItem(results[0]);
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
			html = resultsArray[i]/*[i][0]*/;

			var div = document.createElement("div");
			div.innerHTML = html;
			var text = div.textContent || div.innerText || "";
			text = text.toLowerCase();
			text = text.replace(results[0],'<b>'+results[0]+'</b>');

			resultsArray[i]/*[i][0]*/ = text;

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
				var hItemText = historyArray[i]/*[i][0]*/;
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
			if (historyTermArray.indexOf(resultsArray[i]/*[i][0]*/) == -1)
			{
				var provHTMLContents;
				provHTMLContents = '<li class="dropdown-item">'+resultsArray[i]/*[i][0]*/+'</li>';

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