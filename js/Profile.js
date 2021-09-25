// 用户个人主页 ver 2021-09-25
loadOptions().then(data=>{
	if(data.enablePc && data.optimize){
		insertCss();
		addProfileCSS();
		fixedTimeLineMobile();	
	}
})


function addProfileCSS(){
	addCSSText(`
	.ProfileHeader-buttons {
		position: inherit;
	}

	.ProfileHeader-info {
		display: flex;
		align-items: center;
	}

	.ProfileHeader-contentBody {
		height: auto!important;
	}

	.ProfileHeader-infoItem:not(:last-child) {
		margin-bottom: 0;
	}

	.ProfileHeader-title {
		flex-direction: column;
	}

	.ProfileHeader-headline {
		margin-left: 0;
		font-size: 14px;
	}

	.PageHeader .ProfileMain-header {
		width: calc(100% - 86px);
		overflow: scroll;
	}
	`)
}
