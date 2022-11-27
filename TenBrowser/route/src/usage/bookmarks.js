(function() {
   	
	var bookmarks = [];


	function setBookmarksData()
	{

		var bookmarks = localStorage.getItem("bookmarks") ? JSON.parse(localStorage.getItem("bookmarks")) : [];	
		var html = '';
			
		html += '<div class="items-container">';

		//Loop Bookmarks Objects
		for (var i = 0; i < bookmarks.length; i++) 
		{
			var item = bookmarks[i];
			
			html += 	'<div id="item-container" style="cursor:pointer">';
			html +=			'<div class="website-icon" id="icon" style="background-image: url('+item.favicon+');"></div>';
			html +=			'<div id="title-and-domain">'			
			html +=				'<a id="title" class="website-title" title="'+item.url+'" onclick=createTab("'+item.url+'"); focus-type="title" tabindex="0"> '+item.title+' </a>';
			html +=     	'</div>';
			html += 	'</div>';										            
		}; 

		html += '</div>'

		 $('#bookmarks-wrapper').eq(0).append(html);	
	}

   	setBookmarksData();

})();