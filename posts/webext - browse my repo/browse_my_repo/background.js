// https://github.com/lockex1987/lockex1987.github.io/tree/master/posts/sass%20-%20repsonsive
// https://lockex1987.github.io/posts/sass%20-%20repsonsive/

var username = 'lockex1987';
var githubPath = `https://github.com/${username}/${username}.github.io/`;
var pagePath = `https://${username}.github.io/`;

function githubToPage(url) {
	return url.replace(githubPath, pagePath)
            .replace('/tree/master/', '/')
            .replace('/blob/master/', '/');
}

function pageToGithub(url) {
	return githubPath + 'tree/master/' + url.substring(pagePath.length);
}

chrome.browserAction.onClicked.addListener(function(tab) {
	var url = tab.url;
	var redirectUrl = url.includes(githubPath) ? githubToPage(url) : pageToGithub(url);
	//console.log(url, redirectUrl);
	chrome.tabs.update(tab.id, { url: redirectUrl });
});
