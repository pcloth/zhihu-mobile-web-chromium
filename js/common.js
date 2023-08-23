// 插入css优化
function insertCss() {
	const myCss = chrome.runtime.getURL('zhihuMobile.css');
	$("head").append(`<link type="text/css" rel="stylesheet" href="${myCss}">`);

}

function addCSSText(cssText){
    let style = document.createElement('style'),  //创建一个style元素
        head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
    style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
    if(style.styleSheet){ //IE
        let func = function(){
            try{ //防止IE中stylesheet数量超过限制而发生错误
                style.styleSheet.cssText = cssText;
            }catch(e){

            }
        }
        //如果当前styleSheet还不能用，则放到异步中则行
        if(style.styleSheet.disabled){
            setTimeout(func,10);
        }else{
            func();
        }
    }else{ //w3c
        //w3c浏览器中只要创建文本节点插入到style元素中就行了
        let textNode = document.createTextNode(cssText);
        style.appendChild(textNode);
    }
    head.appendChild(style); //把创建的style元素插入到head中    
}



// 处理顶部搜索栏目
function fixedSearchInput(){
	// 给搜索表单添加事件缩放尺寸
	let input = document.querySelector('form.SimpleSearchBar-wrapper input.Input');
	let form = document.querySelector('form.SimpleSearchBar-wrapper');
	// 这个css是知乎动态赋予的，所以要延迟200ms开始执行；
	let box = document.querySelector('.TopstoryPageHeader-aside');
	if(!box || !box.style){
		return setTimeout(fixedSearchInput,200)
	}
	box.style.setProperty('margin-left', '220px')
	input.addEventListener('focus', function () {
		form.style.setProperty('width', '200px');
		box.style.setProperty('margin-left', '0px');
	})

	form.addEventListener('click', function () {
		input.focus()
	})

	input.addEventListener('blur', function () {
		form.style.setProperty('width', '80px');
		box.style.setProperty('margin-left', '220px');
	})
	document.body.scrollTop = document.documentElement.scrollTop = 0;

}

// js优化时间线手机样式
function fixedTimeLineMobile() {
	// 修复手机版的一些显示字样
	let a = $('a.Tabs-link.AppHeader-TabsLink');

	if (a && a.length >= 3) {
		a[3].text = '你答';
	}

	// 隐藏顶部关注栏的知乎图标链接，节省空间
	$('.AppHeader-inner a[aria-label="知乎"]').remove();
	
	fixedSearchInput()

	// 动态处理内容
	removeThankButton(document)
	hideVideo(document)
	new MutationObserver((mutations, observer) => {
		for (let m of mutations) {
			for (let node of m.addedNodes) {
				if (node.nodeType === Node.ELEMENT_NODE) {
					removeThankButton(node)
					hideVideo(node)
					popupCommentWindow(node)
					findImageElement(node)
				}
			}
		}
	}).observe(document.body, {
		childList: true,
		subtree: true
	})
}

// 查找视频节点的父节点，找到答案卡片，直接移除
function __video_parent__(item) {
	if (item.parentElement.className.includes('Card TopstoryItem')) {
		// 使用隐藏，避免知乎自己的刷新功能失效；
		return item.parentElement.hidden = true;
	} else {
		return __video_parent__(item.parentElement)
	}
}

// 隐藏视频
function hideVideo(node) {
	let selectors = []
	
	if(options.noVideo){
		selectors.push('.ZVideoItem-video')
		selectors.push('.VideoAnswerPlayer')
	}
	if(options.noAdv){
		// 屏蔽广告
		selectors.push('.Pc-feedAd-container')
	}
	let selectorsString = selectors.join(',')
	if (options.noVideo) {
		node.querySelectorAll(selectorsString).forEach(item => {
			__video_parent__(item)
		})
	}
}

// 处理感谢按钮
function removeThankButton(node) {
	// button.BottomActions-CommentBtn为专栏的浮动按钮，下面的申请转载也是专栏特有
	node.querySelectorAll('button.ContentItem-action,button.BottomActions-CommentBtn')
		.forEach(btn => {
			let $text = btn.childNodes[1]
			let group
			if ($text && $text.nodeType === Node.TEXT_NODE) {
				let text = $text.textContent.replace(' ', '');
				if (['感谢', '取消感谢', '举报', '收藏', '喜欢','申请转载'].indexOf(text) >= 0) {
					$text.textContent = ''
				} else if (text === '添加评论') {
					$text.textContent = '评论'
				} else if ((group = text.match(/(\d+)条评论/))) {
					$text.textContent = `${group[1]}`
				} else {
					console.log($text, 'text', text)
				}
			}
		})

}

// 当文章展开得时候，点击评论，会是一个弹窗，处理弹窗得宽度和关闭按钮
function popupCommentWindow(node){
	const popup = $("div[class^='css-'][tabindex='0']")
	if(popup && popup[0] && popup[0].style){
		popup[0].style.width = '100%'
		const button = popup.find('button[aria-label="关闭"]')
		if(button && button[0]){
			button[0].style.right='140px';
			button[0].style.background='#ccc';
			button[0].style.top='0px';
		}
	}
}

/** 查找图片元素，给它添加打开新窗口，方便放大查看 */
function findImageElement(node) {
	node.querySelectorAll('figure[data-size="normal"] img').forEach(img => {
		img.addEventListener('click', function () {
			window.open(img.src)
		})
	})
}
