(function() {
   
	const DAYS = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const MONTHS = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];

	var history = {}

	function getRandomInt(max) 
	{
	  return Math.floor(Math.random() * Math.floor(max));
	}

	function setHistoryData()
	{

		function getDayString(date)
		{
			var day_string = "";

			if(date.getDate() == new Date().getDate())
			{
				day_string += "Today - " + DAYS[date.getDay()] + ", " + MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(); 
			}
			else if(date.getDate() == new Date().getDate()-1)
			{
				day_string += "Yesterday - " + DAYS[date.getDay()] +", " + MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(); 	
			}
			else
			{
				day_string += DAYS[date.getDay()] +", " + MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
			}

			return day_string;
		}

		function getHour(date)
		{
			var time_str = "";
			var hour = date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours().toString();
			var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();

			time_str += hour + ":" + minutes;
			time_str += date.getHours() > 12 ? " PM" : " AM";
			return time_str;
		}

		var history = localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : {};
		var keys_ordered = Object.keys(history).sort(function(a, b){return b-a});


		//Loop Days
		for (var i = 0; i < keys_ordered.length; i++) 
		{
			var time = parseInt(keys_ordered[i]);
			var date = new Date(time);
			var day_arr = history[time];

			var html = '<div class="day-container">';
			html +=    		'<div class="card-title">'+getDayString(date)+'</div>';

				//Loop Items
				for (var j = 0; j < day_arr.length; j++) 
				{
					var item = day_arr[j];

					html += '<div id="item-container" style="cursor:pointer">';
					html += 	'<span id="time-accessed" title="'+new Date(item.time)+'">'+getHour(new Date(item.time))+'</span>'
					html +=		'<div class="website-icon" id="icon" style="background-image: url('+item.favicon+');"></div>';
					html +=		'<div id="title-and-domain">'			
					html +=			'<a id="title" class="website-title" title="'+item.url+'" onclick=createTab("'+item.url+'"); focus-type="title" tabindex="0"> '+item.url+' </a>';
					html +=			'<span id="domain">'+item.title+'</span>'
					html +=     '</div>';
					html += '</div>';
				};

			html +=    '</div>'			 

            $('#history-wrapper').eq(0).append(html);
		}; 	
	}

   	setHistoryData();

})();