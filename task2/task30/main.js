//获取需要的HTML元素
var elements=(function(){
	return {
		form:document.getElementById("form"),
      		validate:document.getElementById("validate"),
     		nameTip:document.getElementById("name-tip"),
     		pwdTip:document.getElementById("password-tip"),
     		rePwdTip:document.getElementById("confirm-pwd-tip"),
     		emailTip:document.getElementById("email-tip"),
     		phoneTip:document.getElementById("phone-tip")
	}
})();

//验证输入函数
function checkInput(id,value,focus){
	var len=0,//输入总长度
	      itemLen,//每个字符对应长度
	      valueList=[],//用来存放分割后输入值
	      nameList=["必填，长度为4~16个字符","名称不能为空","输入过短，字符数应为4~16位","输入过长，字符数应为4~16位","名称格式正确"],
	      pwdList=["必填，长度为6~12,只允许输入英文字母或数字","密码不能为空","密码格式不正确，请重新输入","密码输入正确"],
	      rePwdList=["必填，长度为6~12,只允许输入英文字母或数字","密码不能为空","密码格式不正确，请重新输入","两次输入密码不一致，请重新输入","两次输入密码一致"],
	      emailList=["必填，请输入正确邮箱格式,例如zhangsan@163.com","邮箱格式错误，请重新输入","邮箱输入正确"],
	      phoneList=["必填，请输入11位手机号码","手机号码格式错误，请重新输入","手机号码输入正确"];
	switch(id){
		case "user-name":
			if(value==""){
				if(focus){
					return nameList[0];
				}else{
					return nameList[1];
				}
			}else{
				valueList=value.split("");
				for(var i=0;i<valueList.length;i++){
					if(/[\u4e00-\u9fa5]/.test(valueList[i])){
						itemLen=2;
					}else{
						itemLen=1;
					}
					len+=itemLen;
				}
				if(len<4){
					return nameList[2];
				}else if(len>16){
				return nameList[3];
				}else{
					return nameList[4];
				}
			}
			break;
		case "password":
			if(value==""){
				if(focus){
					return pwdList[0];
				}else{
					return pwdList[1];
				}
			}else if(/^[0-9a-zA-Z]{6,12}$/.test(value)){
				return pwdList[3];
			}else{
				return pwdList[2];
			}
			break;
		case "confirm-pwd":
			if(value==""){
				if(focus){
					return rePwdList[0];
				}else{
					return rePwdList[1];
				}
			}else if((value==document.getElementById("password").value)){
				if(!(/^[0-9a-zA-Z]{6,12}$/.test(value))){
					return rePwdList[2];
				}else{
					return rePwdList[4];
				}

			}else{
				return rePwdList[3];
			}
			break;
		case "email":
			if(value==""){
				if(focus){
					return emailList[0];
				}else{
					return emailList[1];
				}
			}else if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)){
				return emailList[3];
			}else{
				return emailList[2];
			}
			break;
		case "phone":
			if(value==""){
				if(focus){
					return phoneList[0];
				}else{
					return phoneList[1];
				}
			}else if(/^1\d{10}$/.test(value)){
				return phoneList[3];
			}else{
				return phoneList[2];
			}
			break;
	}
}

//输入框聚焦事件处理程序
function inputFocus(){
	var target=event.target;
	if(target.nodeName=="INPUT"){
		var id=target.id,
	                  value=target.value,
	                  tipContent;
	                  tipContent=checkInput(id,value,1);
		switch(id){
			case "user-name":
				elements.nameTip.innerHTML=tipContent;
				break;
			case "password":
				elements.pwdTip.innerHTML=tipContent;
				break;
			case "confirm-pwd":
				elements.rePwdTip.innerHTML=tipContent;
				break;
			case "email":
				elements.emailTip.innerHTML=tipContent;
				break;
			case "phone":
				elements.phoneTip.innerHTML=tipContent;
				break;
		}
	}
}
//验证按钮点击事件处理程序
function buttonClick(){
	var value=input.value;
	var result=checkInput(value);
	input.className="";
	tip.className="";
	tip.innerHTML="必填，长度为4~16个字符";
	switch(result){
		case "null":
			input.className="wrong-input";
			tip.className="wrong-tip";
			tip.innerHTML="姓名不能为空";
			break;
		case "tooShort":
			input.className="wrong-input";
			tip.className="wrong-tip";
			tip.innerHTML="输入过短，字符数应为4~16位";
			break;
		case "tooLong":
			input.className="wrong-input";
			tip.className="wrong-tip";
			tip.innerHTML="输入过长，字符数应为4~16位";
			break;
		case "right":
			input.className="right-input";
			tip.className="right-tip";
			tip.innerHTML="名称格式正确";
			break;
	}
}
//给button绑定事件处理程序
function bindClickFunc(){
	validate.addEventListener("click",buttonClick,false);
}
//给输入框绑定聚焦事件
function bindFocusFunc(){
	(elements.form).addEventListener("focusin",inputFocus,false);
	elements.form.onfocus=inputFocus;
}
//初始化事件
function init(){
	bindClickFunc();
	bindFocusFunc();
}
init();
