Statistics = new Object();
Statistics.ID = "UA-10663941-1";


Statistics.GetDomain = function()
{
	var url = location.href;
	var pos = url.indexOf("://");

	if (pos >= 0) pos = url.indexOf("/", pos + 3);
	if (pos >= 0) url = url.substr(0, pos);

	return url;
}

Statistics.Initialize = function()
{
	var headList = document.getElementsByTagName("HEAD");

	for (var i = 0; i < headList.length; i++)
	{
		var script = document.createElement("SCRIPT");

		script.onload = function(){_uacct=Statistics.ID;urchinTracker();};
		script.onreadystatechange = function(){if(script.readyState=="complete"||script.readyState=="loaded"){_uacct=Statistics.ID;urchinTracker();}};
		script.src = "https://ssl.google-analytics.com/urchin.js";
		script.type = "text/javascript";

		headList[i].appendChild(script);
	}

	if (document.getElementsByTagName)
	{
		var link = document.getElementsByTagName("A");
		var linkExpr = /\.(asp|aspx|htm|html|shtm|shtml)$/gi;
		var path = Statistics.GetDomain();

		// add click event to non-HTML links
		for (var i = 0; i < link.length; i++)
		{
			var linkPath = link[i].href.replace(path, "");

			if (linkPath.indexOf("?") >= 0) linkPath = linkPath.substr(0, linkPath.indexOf("?"));
			if (linkPath.indexOf("://") < 0 && linkPath.indexOf("javascript:") < 0 && linkExpr.test(linkPath) == false)
			{
				link[i].uHref = linkPath;

				if (link[i].addEventListener == null)
				{
					link[i].addEventListener = function(e,f,b){this.attachEvent("on" + e, f)};
				}

				link[i].addEventListener("click", function(){urchinTracker(this.uHref)}, false);
			}
		}
	}

}

Statistics.Initialize();