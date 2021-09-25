// 加载配置参数后插入改变UA信息,使之伪装成PC浏览器
let ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
chrome.runtime.sendMessage({zhihuInjected: true}, function(n){
	loadOptions().then(data=>{
		if(data.enablePc){
			var t=document.createElement("script");
			t.type="text/javascript";
			t.text=`navigator.__defineGetter__('userAgent', function () { return '${ua}'; });`;
			document.getElementsByTagName("head")[0].appendChild(t);
		}
	})
})