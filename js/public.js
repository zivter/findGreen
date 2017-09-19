//获取css样式
function getstyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
}

//缓冲运动
function move(obj,json,speed1,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bstop=true;
		for(var attr in json){
			var current=null;
			if(attr=='opacity'){
				current=Math.round(getstyle(obj,attr)*100);
			}else{
				current=parseInt(getstyle(obj,attr));
			}
			var speed=( json[attr]-current)/speed1;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(current!= json[attr]){
				if(attr=='opacity'){
					obj.style.opacity=(current+speed)/100;
					obj.style.filter='alpha(opacity='+(current+speed)+')';
				}else{
					obj.style[attr]=current+speed+'px';
				}
				bstop=false;
			}
		}
		
		if(bstop){
			clearInterval(obj.timer);
			fn&&fn();
		}
	},20);
}



//碰撞检测
function hit(obj1,obj2){
	if(!(obj1.offsetLeft+obj1.offsetWidth<obj2.offsetLeft || obj1.offsetLeft>obj2.offsetLeft+obj2.offsetWidth || obj1.offsetTop+obj1.offsetHeight<obj2.offsetTop || obj1.offsetTop>obj2.offsetTop+obj2.offsetHeight)){
		return true;//碰上了
	}else{
		return false;//没碰上
	}
}
//通过类名获取元素


var tool={
	ranNum:function (min,max){//获取随机数
		return Math.floor(Math.random()*(max-min+1))+min;
	},
	$:function(id){
		return document.getElementById(id);
	},
	getclass:function (sclass,sparent){//sclass:类名  sparent:父框
		sparent=sparent||document;
		var arr=[];//存放匹配正确的元素对象
		var reg=new RegExp('\\b'+sclass+'\\b');//单词边界
		var eles=sparent.getElementsByTagName('*');//父框下面所有的元素
		for(var i=0;i<eles.length;i++){
			if(reg.test(eles[i].className)){
				arr.push(eles[i]);//符合条件的元素追加数组中
			}
		}
		return arr;
	}
};


var cookie={
	//添加cookie
	setcookie:function (key,value,day){
		var date=new Date();
		date.setDate(date.getDate()+day);//设置过期时间
		document.cookie=key+'='+encodeURI(value)+';expires='+date;
	},
	//获取cookie
	getcookie:function (key){
		var arr=decodeURI(document.cookie).split('; ');//编码后拆分成数组
		for(var i=0;i<arr.length;i++){
			var newarr=arr[i].split('=');//对数组的每一项再次拆分
			if(newarr[0]==key){//比较key值
				return newarr[1];//输出key对应的value
			}
		}
	},
	//删除cookie
	delcookie:function (key){
		setcookie(key,'value',-1);//-1:代表过去时间
	}
}
