// 话题页面//似乎知乎已经放弃话题页面了，功能很多有问题 ver 2021-09-25
loadOptions().then(data=>{
	if(data.enablePc && data.optimize){
		insertCss();
		fixedTimeLineMobile();
	}
})
