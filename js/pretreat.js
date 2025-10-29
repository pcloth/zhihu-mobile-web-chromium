// 加载配置参数后插入改变UA信息,使之伪装成PC浏览器
let ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
chrome.runtime.sendMessage({zhihuInjected: true}, function(n){
	loadOptions().then(data=>{
		if(data.enablePc){
			// inject extension-hosted script (avoids inline-script CSP)
			var t = document.createElement('script');
			t.type = 'text/javascript';
			t.src = chrome.runtime.getURL('js/inject-ua.js') + '?ua=' + encodeURIComponent(ua);
			t.defer = true;
			(document.head || document.documentElement).appendChild(t);
		}
	})
})