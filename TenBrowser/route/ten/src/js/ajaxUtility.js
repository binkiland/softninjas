// AJAX Utility Object

var ajax =
{
    "get" : function(url, cb, ecb, headers)
    {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {

            if (xhr.readyState == 4)
            {
                if (xhr.status == 200)
                {

                    if (cb != undefined)
                    {
                        cb(xhr);
                    }
                }
                else
                {

                    if (ecb != undefined)
                    {
                        ecb(xhr);
                    }
                }
            }
        }
        xhr.open('GET', url, true);
        
        if (headers)
        {
        	for (h in headers)
        	{
        		xhr.setRequestHeader(h, headers[h]);
        	}
        }
        
        xhr.send();
    },
    "head" : function(url, cb, ecb)
    {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4)
            {
                if (xhr.status == 200)
                {

                    if (cb != undefined)
                    {
                        cb(xhr);
                    }
                }
                else
                {
                	
                    if (ecb != undefined)
                    {
                        ecb(xhr);
                    }
                }
            }
        }
        xhr.open('HEAD', url, true);
        xhr.send();
    },
    "post": function(url, cb, ecb, headers, content)
    {
    	var xhr;

        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4)
            {
                if (xhr.status == 200)
                {

                    if (cb != undefined)
                    {
                        cb(xhr);
                    }
                }
                else
                {   
                	
                    if (ecb != undefined)
                    {
                        ecb(xhr);
                    }
                }
            }
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        if (headers)
        {
        	for (h in headers)
        	{
        		xhr.setRequestHeader(h, headers[h]);
        	}
        }
        var contents = null;
        if (content)
        {
        	contents = '';
        	for (c in content)
        	{
        		if (contents)
        		{
        			contents += '&';
        		}
        		contents += c + '=' + content[c];
        	}
        }

        xhr.send(contents);
    }
};
