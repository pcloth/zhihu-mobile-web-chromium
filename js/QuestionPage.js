
// 问题页面和答案页面处理 ver 2021-09-25
loadOptions().then(data=>{
	if(data.enablePc && data.optimize){
		insertCss();
		fixedTimeLineMobile();
		removeAdv();

		// 懒加载处理广告
		new MutationObserver((mutations, observer) => {
			for (let m of mutations) {
				for (let node of m.addedNodes) {
					if (node.nodeType === Node.ELEMENT_NODE) {
						removeAdv(node)
					}
				}
			}
		}).observe(document.body, {
			childList: true,
			subtree: true
		})	
	}
})

// 问题答案页面的独立广告
function removeAdv(){
	document.querySelectorAll('.Pc-card.Card').forEach(item=>{
		item.remove();
	})
}