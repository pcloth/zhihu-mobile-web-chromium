function hackRequest(request){
	for (var t = 0,	i = request.requestHeaders.length; t < i; ++t) 
		if ( request.url != "https://www.zhihu.com/topic" && request.url != "https://zhuanlan.zhihu.com/" && request.requestHeaders[t].name === "User-Agent") {
			request.requestHeaders[t].value = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 YaBrowser/18.4.1.488.00 Safari/537.36';
			break;
		}
	return {requestHeaders: request.requestHeaders};	
}

function checkEnablePc( enablePc) {
	if(enablePc){
		chrome.webRequest.onBeforeSendHeaders.addListener( hackRequest, {urls: [
			"*://www.zhihu.com/",
			"*://www.zhihu.com/question/*",
			"*://www.zhihu.com/search*",
			"*://www.zhihu.com/people/*",
			"*://www.zhihu.com/topic/*",
			"*://zhuanlan.zhihu.com/*"
		]}, ["blocking", "requestHeaders"]);
	}
	else
		chrome.webRequest.onBeforeSendHeaders.removeListener( hackRequest);
}

chrome.storage.onChanged.addListener(function(changes){
	if(changes.enablePc !== undefined)
		checkEnablePc(changes.enablePc.newValue);
});

// 初始化参数
chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.local.set(options);
	checkEnablePc(true);
});


chrome.storage.local.get('enablePc', function(data){
	if(data.enablePc !== undefined)
		checkEnablePc(data.enablePc);
});