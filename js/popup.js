
loadOptions(true)
// 给checkbox添加事件处理
document.querySelectorAll('input.checkbox').forEach(input=>{
	input.onchange = function(element){
		let value = element.target.checked;
		let name = element.target.id;
		setValue(name, value, true)
	}
})

