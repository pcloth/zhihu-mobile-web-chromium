let options = {
	enablePc:true, // 指定PC ua
	optimize:true, // 优化手机样式
	noVideo:true // 隐藏视频回答
}
let keysArr = Object.keys(options)

// 读取参数
function loadOptions(){
	chrome.storage.local.get(keysArr, function(data){
		Object.assign(options, data)
		for(let key in options){
			setValue(key, options[key])
		}
		checkState( options.enablePc);
	});
}


// 控制某个checkbox的状态
function setDisabledStatus(name, value){
	let domCheckBox = document.getElementById(name);
	if(name!=='enablePc'){
		domCheckBox.disabled = value
	}
	if(value && name !=='enablePc'){
		domCheckBox.previousElementSibling.style.color = '#ccc';
	}else{
		domCheckBox.previousElementSibling.style.color = '#fff';
	}
}

// 设置某个参数
function setValue(name,value){
	let domCheckBox = document.getElementById(name);
	domCheckBox.checked = value;
	let obj = {}
	obj[name] = value
	chrome.storage.local.set(obj);
	if(name==='enablePc'){
		checkState(value)
	}
}

// 检查状态
function checkState(enablePc){
	for(let i in keysArr){
		setDisabledStatus(keysArr[i], !enablePc)
	}	
}


loadOptions()

// 给checkbox添加事件处理
document.querySelectorAll('input.checkbox').forEach(input=>{
	input.onchange = function(element){
		let value = element.target.checked;
		let name = element.target.id;
		setValue(name, value)
	}
})
