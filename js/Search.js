// 搜索页面 ver 2021-09-25（未完成）
loadOptions().then(data=>{
	if(data.enablePc && data.optimize){
		insertCss();
		fixedTimeLineMobile();	
	}
})