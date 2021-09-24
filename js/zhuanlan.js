// 专栏处理 ver 2021-09-24
loadOptions().then(data=>{
	if(data.enablePc && data.optimize){
		insertCss();
		removeThankButton(document);
		appendMenus();
	}
})

//添加应用内打开按钮在右下角
function appendMenus(){
	let params = window.location.pathname.split('/');
	if(params[1] && params[1] === 'p' && params[2]){
		let menus = $(".ContentItem-actions");
		let appbutton = document.createElement('a');
		appbutton.href = `zhihu://articles/${params[2]}`;
		appbutton.className = "Menu-item";
		appbutton.text = 'APP';
		menus.append(appbutton);
	}else{
		// 专栏首页的换一批按钮
		let changeBtn = document.querySelector('.Button.ColumnHomeBottom-requestButton');
		if(!changeBtn){
			return setTimeout(appendMenus,200);
		}
		changeBtn.style.display= 'block';
	}
}
