// chrome.storage.local.get(['enablePc', 'optimize'], function(data){
// 	if(data.enablePc && data.optimize){
// 		$main = $("main.App-main > div", $root);
// 		$mainColumn = $('#People-mainColumn', $main);
// 		$sideBar = $('.Profile-sideColumn', $main);

// 		insertCss();

// 		//修改 应用内打开 链接
// 		var params = window.location.pathname.split('/');
// 		if( params[1] && params[1] === 'people' && params[2])
// 			$(".tb-app", $leftSide).attr('href', 'zhihu://people/' + params[2]);
// 		else
// 			$(".tb-app", $leftSide).attr('href', 'zhihu://');
// 	}
// });

// 用户个人主页 ver 2021-09-25
loadOptions().then(data=>{
	if(data.enablePc && data.optimize){
		insertCss();
		addProfileCSS();
		fixedTimeLineMobile();	
		fixedProfile();
	}
})

function fixedProfile(){
	document.querySelector('.ProfileButtonGroup.ProfileMain-buttons').children[0].textContent = '编辑'
}


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
