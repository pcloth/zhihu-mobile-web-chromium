// 时间线处理
loadOptions().then(data=>{
	if(data.enablePc && data.optimize){
		insertCss();		
	}
})
