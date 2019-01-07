chrome.browserAction.onClicked.addListener(function(tab) {
	var url = tab.url;
	var username = 'lockex1987';
	var oldPath = `https://github.com/${username}/${username}.github.io/`;
	var newPath = `https://${username}.github.io/`;
	var redirectUrl = url.replace(oldPath, newPath)
            .replace('/tree/master/', '/')
            .replace('/blob/master/', '/');
	chrome.tabs.update(tab.id, { url: redirectUrl });
});
