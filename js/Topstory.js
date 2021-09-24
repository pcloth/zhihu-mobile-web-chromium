// 时间线(关注和推荐)处理
loadOptions().then(data=>{
	if(data.enablePc && data.optimize){
		insertCss();
		fixedTimeLineMobile();	
	}
})
