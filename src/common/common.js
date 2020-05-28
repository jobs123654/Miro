class common {
	/* 	全屏 */
	fullScreen() {
	    try{
	    	var element = document.documentElement;
	    	if (element.requestFullscreen) {
	    	    element.requestFullscreen();
	    	} else if (element.msRequestFullscreen) {
	    	    element.msRequestFullscreen();
	    	} else if (element.mozRequestFullScreen) {
	    	    element.mozRequestFullScreen();
	    	} else if (element.webkitRequestFullscreen) {
	    	    element.webkitRequestFullscreen();
	    	}
	    }catch(e){
	     alert(e.message)
		}
	}
	//退出全屏 
	 exitFullscreen() {
	    try{
	    	if (document.exitFullscreen) {
	    	    document.exitFullscreen();
	    	} else if (document.msExitFullscreen) {
	    	    document.msExitFullscreen();
	    	} else if (document.mozCancelFullScreen) {
	    	    document.mozCancelFullScreen();
	    	} else if (document.webkitExitFullscreen) {
	    	    document.webkitExitFullscreen();
	    	}
	    }catch(e){
	    	//TODO handle the exception
	     alert(e.message)
		}
	}
	/* 下载文件 */
	downLoad(url) {
		let k=this.checkBrowser();
		let aLink = document.createElement('a');
			aLink.style.display = 'none';
			aLink.href = url;
			aLink.download = "下载文件名xxx.png";
			// 触发点击-然后移除
			document.body.appendChild(aLink);
			aLink.click();
			document.body.removeChild(aLink);
		/* 兼容IE、Edge文件下载*/
		if (k==="IE"||k==="Edge"){
			//IE
			// odownLoad.href="#";
			// var oImg=document.createElement("img");
			// oImg.src=url;
			// oImg.id="downImg";
			// var odown=document.getElementById("down");
			// odown.appendChild(oImg);
			// this.SaveAs5(document.getElementById('downImg').src)
		}else{
			//其他主流浏览器
			aLink.href=url;
			aLink.download="";
		}
	    }
	/* 判断浏览器类型 */
	 checkBrowser(){
		 var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		 var isOpera = userAgent.indexOf("Opera") > -1;
		 if (isOpera) {
			 return "Opera"
		 }; //判断是否Opera浏览器
		 if (userAgent.indexOf("Firefox") > -1) {
			 return "FF";
		 } //判断是否Firefox浏览器
		 if (userAgent.indexOf("Chrome") > -1){
			 return "Chrome";
		 }
		 if (userAgent.indexOf("Safari") > -1) {
			 return "Safari";
		 } //判断是否Safari浏览器
		 if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
			 return "IE";
		 }; //判断是否IE浏览器
		 if (userAgent.indexOf("Trident") > -1) {
			 return "Edge";
		 } //判断是否Edge浏览器
	 }
	  
	  saveAs5(imgURL)
		{
			var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
			for(; oPop.document.readyState != "complete"; )
			{
				if (oPop.document.readyState == "complete")break;
			}
			oPop.document.execCommand("SaveAs");
			oPop.close();
		}
	// 打印
	   doPrint(target) {
		let subOutputRankPrint = document.getElementById(target);
		
		let newContent = subOutputRankPrint.innerHTML;
		let oldContent = document.body.innerHTML;
		document.body.innerHTML = newContent;
		window.print();
		window.location.reload();
		document.body.innerHTML = oldContent;
	        return false;
	    }
		/* 导出图片 */
		exportImg(map){
			
		html2canvas(document.getElementById(map)).then(function(canvas) {
			var dataUrl = canvas.toDataURL();
			var newImg = document.createElement("img");
			newImg.src =  dataUrl;
			document.body.appendChild(newImg);
		});   
	  }
	/* 日期格式化 */
	formatDate(numb, format) {
	       const time = new Date((numb - 1) * 24 * 3600000 + 1)
	       time.setYear(time.getFullYear() - 70)
	       const year = time.getFullYear() + ''
	       const month = time.getMonth() + 1 + ''
	       const date = time.getDate() - 1 + ''
	       if (format && format.length === 1) {
	         return year + format + month + format + date
	       }
	       return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
	     }
	// Bing在线地图的url构造函数
	tileUrlFunction(coord, params1, params2) {
	    
		return common.getVETileUrl(coord[0], coord[1], -coord[2] - 1);
	}
	compareTime(a,b){
		let startTime= new Date(Date.parse(a));
		let endTime=new Date(Date.parse(b));
		return startTime-endTime>0
	}
	static getVETileUrl(z, x, y) {
		for(var a="",c=x,d=y,e=0;e<z;e++) {
			a=((c&1)+2*(d&1)).toString()+a;
			c>>=1;
			d>>=1
		}
		return 'http://dynamic.t0.tiles.ditu.live.com/comp/ch/' + a + '?it=G,VE,BX,L,LA&mkt=zh-cn,syr&n=z&og=111&ur=CN'
	}
    /* 获取最近的点*/
	nearPoint(t,data){
		let d=1000,result=null
		if(data&&data.length>0){
		data.forEach(e=>{
			let dis=this.GetDistance(t,e)
			if(dis<d){
				d=dis;
				result=e
			}
		})	
		}
	
		if(d>0.2){return null}
		return result
	}
		/* 获取平面坐标距离 */
	GetDistanceByPM(c,c1){
		return Math.abs(Math.sqrt(Math.pow((c[0]-c1[0]),2)+Math.pow((c[1]-c1[1]),2)))
	}
	/* 获取经纬度距离 */
	GetDistance( o1,o2){
		let lat1=o1.纬度||o1.lat, lng1=o1.经度||o1.lon
		let lat2=o2.纬度||o2.lat, lng2=o2.经度||o2.lon
	    var radLat1 = lat1*Math.PI / 180.0;
	    var radLat2 = lat2*Math.PI / 180.0;
	    var a = radLat1 - radLat2;
	    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
	    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
	    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	    s = s *6378.137 ;// EARTH_RADIUS;
	    s = Math.round(s * 10000) / 10000;
	    return s;
	}
}
let com=new common()
export default com