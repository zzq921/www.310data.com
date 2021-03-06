define(function(require, exports, module) {
	var $ = require("jquery");
	
	//获取指数页面筛选固定日期接口
	function getData_fix_company(obj, fn){
		if(obj.oTime){
			var url = 'http://api1.310data.com/interface/v2/odds/matchs?leagues='+obj.leagues+'&gameType='+obj.gameType+'&tdms='+obj.tdms+'&playStat='+obj.playStat+'&day='+obj.oTime;
		}else{
			var url = 'http://api1.310data.com/interface/v2/odds/matchs?leagues='+obj.leagues+'&gameType='+obj.gameType+'&tdms='+obj.tdms+'&playStat='+obj.playStat;
		}
		console.log(url);
		getData(url, fn);
	}
	//获取指数主页未开赛接口
	function get_future(obj, fn){
		if(obj.oTime){
			var url = 'http://api1.310data.com/interface/v2/odds/matchs?leagues='+obj.leagues+'&gameType='+obj.gameType+'&tdms='+obj.tdms+'&playStat='+obj.playStat+'&day='+obj.oTime;
		}else{
			var url = 'http://api1.310data.com/interface/v2/odds/matchs?leagues='+obj.leagues+'&gameType='+obj.gameType+'&tdms='+obj.tdms+'&playStat='+obj.playStat;
		}
		
		console.log(url);
		getData(url, fn);	
	}
	//获取指数主页未开赛数据
	function getFuture(data,playStat,gameType,playstateId){
		console.log(data);
		$(".box-one").empty();
		$(".box-two").empty();
		$(".box-three").empty();
		var omg = playstateId;
		//console.log(playStat);
		var oData = data;
		//console.log(oData);
		var old_t1 = null;
		var old_t2 = null;
		var str1 = '';
		var str2 = '';
		var titleId = 0;
		for(var j = 0; j < oData.length; j++){
			//console.log(oData);
			if(oData[j].oddsMap == null){
				continue;
			}
			if(oData[j].minutes == null){
				oData[j].minutes = '';
			}
			//console.log(data);
			//console.log(oData[j])
			//转化日期格式
			var d = oData[j].date.split(' ')[0].substring(0,4)+'/'+oData[j].date.split(' ')[0].substring(5,7)+'/'+oData[j].date.split(' ')[0].substr(8,2);
			var odds = oData[j].oddsMap;
			//获得比赛时间
			var future_time=oData[j].date.split(' ')[1].substring(0,5);
			//console.log(future_time);
			//判断未开赛，滚球，完赛时间开始
			//未开赛
			if(playStat == 0){		
				
				oData[j].minutes = future_time;	
				//判断比分开始
				if(oData[j].homeScore == undefined || oData[j].awayScore == undefined || oData[j].homeScore == null){
					//console.log(666);
					oData[j].homeScore = '-';
					oData[j].awayScore = '-';
				}
				//判断比分结束
			}
			//完赛
			if(playStat == 1){	
				//console.log(777);
				if(oData[j].homeScore == undefined || oData[j].awayScore == undefined){
					oData[j].homeScore = '-';
					oData[j].awayScore = '-';
				}
				oData[j].minutes = '完赛';
			
			}
			//滚球
			if(playStat == 2){
			//	console.log(oData[j].homeScore);
				if(oData[j].homeScore == undefined || oData[j].awayScore == undefined){
					oData[j].homeScore = '-';
					oData[j].awayScore = '-';
				}
				//	console.log(oData[i].minutes);
				if(oData[j].minutes > 90){
					oData[j].minutes = '90+';
				}else{
					oData[j].minutes = oData[j].minutes+'’';
					
				}
			}
			
			//自定义属性
			var time = oData[j].date.split(" ");
			var shi_time = time[1].split(":")[0]+":"+time[1].split(":")[1];
			//console.log(shi_time);
			var mid = oData[j].id;
			var ri_qi = time[0];
			var sai = oData[j].leagueName.substring(0,6);
		
			var zhu = oData[j].homeName.substring(0,6);	
			var ke = oData[j].awayName.substring(0,6);
			//判断未开赛，滚球，完赛时间结束
			var state = playStat;
			var hs = oData[j].homeScore;
			var as = oData[j].awayScore;
			var bhs = oData[j].homeHalfScore;
			var bas = oData[j].awayHalfScore;
			if(oData[j].minutes){var onIng = oData[j].minutes;}else{}
			
			for(var i in odds){
				//console.log(odds[i]);
				if(odds[i] == null){
					continue;
				}
				
				//获公司名称
				var gid =odds[i][0].tdm;
				if(gid == 'lj'){gid = '利记'}
				if(gid == 'ms'){gid = '澳彩'}
				if(gid == 'bw'){gid = '智博'}
				if(gid == 'hg'){gid = '皇冠'}
				if(gid == 'hb'){gid = '浩博'}
				if(gid == 'sb'){gid = '沙巴'}
				//根据时间和日期判断是星期
				var i_time=oData[j].date.split(' ')[1];
				//console.log(i_time);
				var o_week = d +','+ i_time;
				var endtime=new Date(o_week).getTime();
				var wek = week(endtime);
				
					//定义即赔赔率
					var ji_arr_zhu = odds[i][0].rio.split(",")[0];
					var ji_pan = odds[i][0].capnum;
					var ji_arr_ke = odds[i][0].rio.split(",")[1];
					//定义初陪赔率
					var chu_arr_zhu = odds[i][1].rio.split(",")[0];
					var chu_pan = odds[i][1].capnum;
					var chu_arr_ke = odds[i][1].rio.split(",")[1];
				//判断亚盘盘口
				//亚盘正数
				if(gameType == 2){
					oTitl = '盘口';
					if(ji_pan == 0.25){
						ji_pan = '平/半';
					}else if(ji_pan == 0){
						ji_pan = '平';
					}else if(ji_pan == 0.5){
						ji_pan = '半球';
					}
					else if(ji_pan == 0.75){
						ji_pan = '半/一';
					}else if(ji_pan == 1.0){
						ji_pan = '一球';
					}else if(ji_pan == 1.25){
						ji_pan = '一/一半';
					}else if(ji_pan == 1.5){
						ji_pan = '一球半';
					}else if(ji_pan == 1.75){
						ji_pan = '球半/两球';
					}else if(ji_pan == 2.0){
						ji_pan = '两球';
					}else if(ji_pan == 2.25){
						ji_pan = '两/两半';
					}else if(ji_pan == 2.5){
						ji_pan = '两球半';
					}else if(ji_pan == 2.75){
						ji_pan = '两半/三';
					}else if(ji_pan == 3.0){
						ji_pan = '三球';
					}else if(ji_pan == 3.25){
						ji_pan = '三/三半';
					}else if(ji_pan == 3.5){
						ji_pan = '三球半';
					}else if(ji_pan == 3.75){
						ji_pan = '三半/四';
					}else if(ji_pan == 4.0){
						ji_pan = '四球';
					}else if(ji_pan == 4.25){
						ji_pan = '四/四半';
					}else if(ji_pan == 4.5){
						ji_pan = '四球半';
					}else if(ji_pan == 4.75){
						ji_pan = '四半/五';
					}else if(ji_pan == 5.0){
						ji_pan = '五球';
					}else{}
					//负数
					if(ji_pan == '-0.25'){
						ji_pan = '受平/半';
					}else if(ji_pan == 0){
						ji_pan = '受平';
					}else if(ji_pan == '-0.5'){
						ji_pan = '受半球';
					}
					else if(ji_pan == '-0.75'){
						ji_pan = '受半/一';
					}else if(ji_pan == '-1.0'){
						ji_pan = '受一球';
					}else if(ji_pan == '-1.25'){
						ji_pan = '受一/一半';
					}else if(ji_pan == '-1.5'){
						ji_pan = '受一球半';
					}else if(ji_pan == '-1.75'){
						ji_pan = '受半/两';
					}else if(ji_pan == '-2.0'){
						ji_pan = '受两球';
					}else if(ji_pan == '-2.25'){
						ji_pan = '受两/两半';
					}else if(ji_pan == '-2.5'){
						ji_pan = '受两球半';
					}else if(ji_pan == '-2.75'){
						ji_pan = '受两半/三';
					}else if(ji_pan == '-3.0'){
						ji_pan = '受三球';
					}else if(ji_pan == '-3.25'){
						ji_pan = '受三/三半';
					}else if(ji_pan == '-3.5'){
						ji_pan = '受三球半';
					}else if(ji_pan == '-3.75'){
						ji_pan = '受三半/四';
					}else if(ji_pan == '-4.0'){
						ji_pan = '受四球';
					}else if(ji_pan == '-4.25'){
						ji_pan = '受四/四半';
					}else if(ji_pan == '-4.5'){
						ji_pan = '受四球半';
					}else if(ji_pan == '-4.75'){
						ji_pan = '受四半/五';
					}else if(ji_pan == '-5.0'){
						ji_pan = '受五球';
					}else{}
					
					//亚盘初陪正数
					if(chu_pan == 0.25){
						chu_pan = '平/半';
					}else if(chu_pan == 0){
						chu_pan = '平';
					}else if(chu_pan == 0.5){
						chu_pan = '半球';
					}
					else if(chu_pan == 0.75){
						chu_pan = '半/一';
					}else if(chu_pan == 1.0){
						chu_pan = '一球';
					}else if(chu_pan == 1.25){
						chu_pan = '一/一半';
					}else if(chu_pan == 1.5){
						chu_pan = '一球半';
					}else if(chu_pan == 1.75){
						chu_pan = '球半/两球';
					}else if(chu_pan == 2.0){
						chu_pan = '两球';
					}else if(chu_pan == 2.25){
						chu_pan = '两/两半';
					}else if(chu_pan == 2.5){
						chu_pan = '两球半';
					}else if(chu_pan == 2.75){
						chu_pan = '两半/三';
					}else if(chu_pan == 3.0){
						chu_pan = '三球';
					}else if(chu_pan == 3.25){
						chu_pan = '三/三半';
					}else if(chu_pan == 3.5){
						chu_pan = '三球半';
					}else if(chu_pan == 3.75){
						chu_pan = '三半/四';
					}else if(chu_pan == 4.0){
						chu_pan = '四球';
					}else if(chu_pan == 4.25){
						chu_pan = '四/四半';
					}else if(chu_pan == 4.5){
						chu_pan = '四球半';
					}else if(chu_pan == 4.75){
						chu_pan = '四半/五';
					}else if(chu_pan == 5.0){
						chu_pan = '五球';
					}else{}
					//负数
					if(chu_pan == '-0.25'){
						chu_pan = '受平/半';
					}else if(chu_pan == 0){
						chu_pan = '受平';
					}else if(chu_pan == '-0.5'){
						chu_pan = '受半球';
					}
					else if(chu_pan == '-0.75'){
						chu_pan = '受半/一';
					}else if(chu_pan == '-1.0'){
						chu_pan = '受一球';
					}else if(chu_pan == '-1.25'){
						chu_pan = '受一/一半';
					}else if(chu_pan == '-1.5'){
						chu_pan = '受一球半';
					}else if(chu_pan == '-1.75'){
						chu_pan = '受半/两';
					}else if(chu_pan == '-2.0'){
						chu_pan = '受两球';
					}else if(chu_pan == '-2.25'){
						chu_pan = '受两/两半';
					}else if(chu_pan == '-2.5'){
						chu_pan = '受两球半';
					}else if(chu_pan == '-2.75'){
						chu_pan = '受两半/三';
					}else if(chu_pan == '-3.0'){
						chu_pan = '受三球';
					}else if(chu_pan == '-3.25'){
						chu_pan = '受三/三半';
					}else if(chu_pan == '-3.5'){
						chu_pan = '受三球半';
					}else if(chu_pan == '-3.75'){
						chu_pan = '受三半/四';
					}else if(chu_pan == '-4.0'){
						chu_pan = '受四球';
					}else if(chu_pan == '-4.25'){
						chu_pan = '受四/四半';
					}else if(chu_pan == '-4.5'){
						chu_pan = '受四球半';
					}else if(chu_pan == '-4.75'){
						chu_pan = '受四半/五';
					}else if(chu_pan == '-5.0'){
						chu_pan = '受五球';
					}else{}
				}else if(gameType == 1){
					oTitl = '平局';
					ji_pan = odds[i][0].rio.split(",")[2];
					chu_pan = odds[i][1].rio.split(",")[2]
				}else if(gameType == 3){
					oTitl = '盘口';
					ji_pan = odds[i][0].capnum;
					chu_pan = odds[i][1].capnum;
				}
				//console.log(odds[i]);
					//数据显示为封盘		
					if(ji_arr_zhu == 0 || ji_arr_ke == 0){
						ji_arr_zhu = '封盘';
						ji_pan = '封盘';
						ji_arr_ke = '封盘';
								
					}
					
					//定义公司
					var gid = odds[i][0].tdm;
					if(gid == 'lj'){gid = '利记'}
					if(gid == 'ms'){gid = '澳彩'}
					if(gid == 'bw'){gid = '智博'}
					if(gid == 'hg'){gid = '皇冠'}
					if(gid == 'hb'){gid = '浩博'}
					if(gid == 'sb'){gid = '沙巴'}
					//console.log(oData[j].homeName);
					//定义即赔和初赔颜色
					var zhu_color = odds[i][0].upDown.split(",")[0];
					var pan_color= odds[i][0].upDown.split(",")[2];
					var ke_color = odds[i][0].upDown.split(",")[1];
					var css = "";
					var c = "";
					var cs = "";
						if(zhu_color == '1'){var css = 'zs-red';} else if(zhu_color == '0') {} else if(zhu_color == '-1') {var css = 'zs-green';}else{}if(pan_color == '1') {var c = 'zs-red';} else if(pan_color == '0') {} else if(pan_color == '-1') {var c = 'zs-green';}else{}if(ke_color == '1') {var cs = 'zs-red';} else if(ke_color == '0') {} else if(ke_color == '-1') {var cs = 'zs-green';}else{}
						//console.log(d);
						var id = titleId++;
				if(old_t1 != d){
						var str1 = '<div class="livezs-data oh"  title-id="'+id+'" id="box-'+id+'"><div class="dl t11 oTime">'+d+'&nbsp;'+wek+'</div> <div class="dr" id="live-btn"><img src="img/score/zb_c4.png"></div></div><div class="livezs-libs"><div class="livezs-lister"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr> <td>'+sai+'</td><td>'+oData[j].minutes+'</td> <td><div class="dl index_w"><div class="dl index_l">'+oData[j].homeName.substring(0,6)+'</div><div class="dl index_r"><div class="dl deepred exp-bf wei"><span>'+oData[j].homeScore+'</span><span>:</span><span>'+oData[j].awayScore+'</span></div><div class="dl index_ke">'+oData[j].awayName.substring(0,6)+'</div></div></div></td></tr></table></div> <div class="livezs-lis-tab"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th>公司</th><th>&nbsp;</th> <th>主胜</th><th>'+oTitl+'</th> <th>客胜</th></tr><tr data-on="'+onIng+'" data-state="'+state+'" data-hs="'+hs+'" data-as="'+as+'" data-bhs="'+bhs+'" data-bas="'+bas+'" data-gid="' + gid + '" data-mid="' + mid + '" data-zhu="' + zhu + '" data-ke="' + ke + '" data-sai="' + sai + '" data-ri_qi="' + ri_qi + '" data-shi_time="' + shi_time + '" class="ya_c"><td rowspan="2">'+gid+'</td><td>即赔</td><td class="'+css+'">'+ji_arr_zhu+'</td><td class="'+c+'">'+ji_pan+'</td><td class="'+cs+'">'+ji_arr_ke+'</td></tr><tr data-on="'+onIng+'" data-state="'+state+'" data-hs="'+hs+'" data-as="'+as+'" data-bhs="'+bhs+'" data-bas="'+bas+'" data-gid="' + gid + '" data-mid="' + mid + '" data-zhu="' + zhu + '" data-ke="' + ke + '" data-sai="' + sai + '" data-ri_qi="' + ri_qi + '" data-shi_time="' + shi_time + '" class="ya_c"><td>初赔</td><td>'+chu_arr_zhu+'</td><td>'+chu_pan+'</td><td>'+chu_arr_ke+'</td></tr></table></div></div>';  
				
				}else{	
					if(old_t2 != oData[j].homeName){
						var str1 = '<div class="livezs-libs"><div class="livezs-lister"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr> <td>'+sai+'</td><td>'+oData[j].minutes+'</td> <td><div class="dl index_w"><div class="dl index_l">'+oData[j].homeName.substring(0,6)+'</div><div class="dl index_r"><div class="dl deepred exp-bf wei"><span>'+oData[j].homeScore+'</span><span>:</span><span>'+oData[j].homeScore+'</span></div><div class="dl index_ke">'+oData[j].awayName.substring(0,6)+'</div></div></div></td></tr></table></div> <div class="livezs-lis-tab"><table width="100%%" border="0" cellspacing="0" cellpadding="0"><tr><th>公司</th><th>&nbsp;</th> <th>主胜</th><th>'+oTitl+'</th> <th>客胜</th></tr><tr data-on="'+onIng+'" data-state="'+state+'" data-hs="'+hs+'" data-as="'+as+'" data-bhs="'+bhs+'" data-bas="'+bas+'" data-gid="' + gid + '" data-mid="' + mid + '" data-zhu="' + zhu + '" data-ke="' + ke + '" data-sai="' + sai + '" data-ri_qi="' + ri_qi + '" data-shi_time="' + shi_time + '" class="ya_c"><td rowspan="2">'+gid+'</td><td>即赔</td><td class="'+css+'">'+ji_arr_zhu+'</td><td class="'+c+'">'+ji_pan+'</td><td class="'+cs+'">'+ji_arr_ke+'</td></tr><tr data-on="'+onIng+'" data-state="'+state+'" data-hs="'+hs+'" data-as="'+as+'" data-bhs="'+bhs+'" data-bas="'+bas+'" data-gid="' + gid + '" data-mid="' + mid + '" data-zhu="' + zhu + '" data-ke="' + ke + '" data-sai="' + sai + '" data-ri_qi="' + ri_qi + '" data-shi_time="' + shi_time + '" class="ya_c"><td>初赔</td><td>'+chu_arr_zhu+'</td><td>'+chu_pan+'</td><td>'+chu_arr_ke+'</td></tr></table></div></div>';
					}else{
						var str1 = '<div class="livezs-libs"><div class="livezs-lis-tab"><table width="100%%" border="0" cellspacing="0" cellpadding="0"><tr></tr><tr data-on="'+onIng+'" data-state="'+state+'" data-hs="'+hs+'" data-as="'+as+'" data-bhs="'+bhs+'" data-bas="'+bas+'" data-gid="' + gid + '" data-mid="' + mid + '" data-zhu="' + zhu + '" data-ke="' + ke + '" data-sai="' + sai + '" data-ri_qi="' + ri_qi + '" data-shi_time="' + shi_time + '" class="ya_c"><td rowspan="2" class="jia">'+gid+'</td><td>即赔</td><td class="'+css+'">'+ji_arr_zhu+'</td><td class="'+c+'">'+ji_pan+'</td><td class="'+cs+'">'+ji_arr_ke+'</td></tr><tr data-on="'+onIng+'" data-state="'+state+'" data-hs="'+hs+'" data-as="'+as+'" data-bhs="'+bhs+'" data-bas="'+bas+'" data-gid="' + gid + '" data-mid="' + mid + '" data-zhu="' + zhu + '" data-ke="' + ke + '" data-sai="' + sai + '" data-ri_qi="' + ri_qi + '" data-shi_time="' + shi_time + '" class="ya_c"><td>初赔</td><td>'+chu_arr_zhu+'</td><td>'+chu_pan+'</td><td>'+chu_arr_ke+'</td></tr></table></div></div>';
					}
				}
				old_t1 = d;
				old_t2 = oData[j].homeName;	
				click_calender();
//				if(omg){
//					console.log(666);
//					//赛程
//					if(omg == 1){$(".box-three").append(str1);}
//					//即时
//					if(omg == 0&&playStat == 2){$(".box-two").append(str1);$(".wei span").css({"color":"rgb(102,102,102)"});}
//					if(omg == 0&&playStat == 0){$(".box-two").append(str1);$(".wei span").css({"color":"rgb(102,102,102)"});}
//					//完赛
//					if(omg == 3){$(".box-two").append(str1);$('.livezs-data #live-btn').empty();}
//				}else{
					//console.log(777);
					//未赛
					if(playStat == 0){$(".box-one").append(str1);$(".wei span").css({"color":"rgb(102,102,102)"});}
					//滚球
					if(playStat == 2){$(".box-two").append(str1);$('.livezs-data #live-btn').empty();}
					//完场
					if(playStat == 1){console.log(666);$(".box-three").append(str1);}
				//}
				fon_color();	
				
			}	
			
			
			
		}
		if($(".box-one").text() == ''&&playStat == 0){$(".box-one").empty();return $(".box-one").html(kong_zhi("<img src='img/kong.png'>","暂无数据"));}else{$('.box-one').append('<div class="kong_bottom"></div>');}
		if($(".box-two").text() == ''&&playStat == 2){$(".box-two").empty();return $(".box-two").html(kong_zhi("<img src='img/kong.png'>","暂无数据"));}else{$('.box-two').append('<div class="kong_bottom"></div>');}
		if($(".box-three").text() == ''&&playStat == 1){$(".box-three").empty();return $(".box-three").html(kong_zhi("<img src='img/kong.png'>","暂无数据"));}else{$('.box-three').append('<div class="kong_bottom"></div>');}
		//标题浮动跟随
		if($("li[class='livezs-on']").text() == '未开赛'){
			$(".box-one .livezs-data").each(function(){
		        var id = $(this).attr("title-id");
		        fixedTitle($("#box-"+id));
		    })
		}else if($("li[class='livezs-on']").text() == '滚球'){
			$(".box-two .livezs-data").each(function(){
		        var id = $(this).attr("title-id");
		        fixedTitle($("#box-"+id));
		    })
		}else if($("li[class='livezs-on']").text() == '完场'){
			$(".box-three .livezs-data").each(function(){
		        var id = $(this).attr("title-id");
		        fixedTitle($("#box-"+id));
		    })
		}else{}
	    
	    
	}
	//标题浮动跟随
	function fixedTitle($boxDom){
		var itemOffsetTop = $boxDom.offset().top;
		//console.log(itemOffsetTop);
		//var itemOuterHeight = $boxDom.outerHeight();
		var old = 0;
		$(window).scroll(function () {
			var winScrollTop = $(window).scrollTop();
			//console.log(winScrollTop);
//				if(!(winScrollTop > itemOffsetTop+itemOuterHeight) && !(winScrollTop < itemOffsetTop)) {
//                  if (old !== 1){
//                     $boxDom.addClass("titleFix");
//                     old = 1;
//                  }
//              }else {
//                  if (old !== 0){
//                        $boxDom.addClass("titleFix");
//                        old = 0;
//                  }
//              }
				if(!(winScrollTop > itemOffsetTop-75)) {
                	
                    if (old != 1){
                    	//console.log(555)
                        fixedChange($boxDom,1);
                        old = 1;
                    }
               }else {
                    if (old != 0){
                    	//console.log(666)
                        fixedChange($boxDom,0);
                        old = 0;
                    }
                }
				
		})
		
		function fixedChange($boxDom,val){
                if (val){
                	//console.log(5551);
                    $boxDom.removeClass("titleFix");
                }else{
                	//console.log(6661);
                    $boxDom.addClass("titleFix");
                }
        }
	}
	//获取数据
	function getData(url, fn) {
		$.ajax({
			url: url,
			type:'POST',
			dataType: 'jsonp',
			success: function(data) {
				//console.log(data);
				fn(data);

			},
			error: function(re) {
				window.location.href = '404.html';
			}
		})

	}
	//当即赔或初陪为0时，字体颜色变化
	function fon_color(){
		var x = $(".footb-lists span");
		for(var i = 0; i < x.length; i++){
			var c =$(x[i]).text();
			
			if(c == '封盘'){
				//console.log(666);
				$(x[i]).css({"color":"rgb(0,0,0)"});
			}
		}
	}
	//url/对象互转
	function href() {
		var url = location.search;
		// console.log(url);
		json = {};
		if(url.indexOf("?") === -1) return {};
		var arr = url.substr(1).split("&");
		for(var i = 0, len = arr.length; i < len; i++) {
			json[arr[i].split("=")[0]] =arr[i].split("=")[1];
		}
		//console.log(json);

		return json;
	}
	//根据日期和时间转化成星期
	function week(endtime){
		var myDate = new Date();
		//获取总的毫秒数
		var minutes =endtime;
		//获取一天毫秒数
		var ms = 86400000;
		//console.log(minutes-2*ms);
		function arr(time) {
			//根据毫秒数，转化为固定的时间
			var newTime = new Date(time);
			//将日期部分转化为字符串
			var str_time = newTime.toDateString();
			//console.log(str_time);
			var arr_time = str_time.split(" ");
			return arr_time;
		}
		
		//获取当前星期
		function pan(str){
			if(str == 'Mon'){str = '星期一'}
			if(str == 'Tue'){str = '星期二'}
			if(str =='Wed'){str = '星期三'}
			if(str == 'Thu'){str = '星期四'}
			if(str == 'Fri'){str = '星期五'}
			if(str == 'Sat'){str = '星期六'}
			if(str == 'Sun'){str = '星期日'}
			return str;
		}
		day_time = arr(minutes)[0];
		return pan(day_time);
		
				
	}
	//点击指数页面设置按钮
	function setUp(){
		//点击指数主页设置，出现页面
		$('.live-header').on('click','.live-install',function(){
			$("#index_top").hide();
			$("#set").show();
		})
		//点击指设置页面返回，页面消失
		$('#set').on('click','.in_back',function(){
			$("#index_top").show();
			$("#set").hide();
		})
		//设置页面公司类型多选
		$(".filter-box").on('click','li',function(){
			if($(this).attr("data-id") == 1){
				$(this).attr("data-id","0");
				$(this).removeClass("fil-hove");
			}else{
				$(this).attr("data-id","1");
				$(this).addClass("fil-hove");
			}
			
			
		})
		//设置页面玩法类型单选
		$(".datatype-box li").click(function(){
			$(this).addClass("dat-hove").attr("data-type","1").siblings().removeClass("dat-hove").attr("data-type","0");
			
		})
		
	}
	//设置页面公司类型和玩法点击确定
		$('.affbuttn-box').on('click','.aff-buttn',function(){
			
			confirm();
			function confirm(){
				if($("li[class='livezs-on']").text() == '未开赛'){var playStat = 0;}
				if($("li[class='livezs-on']").text() == '滚球'){var playStat = 2;}
				if($("li[class='livezs-on']").text() == '完场'){var playStat = 1;}
				//判断选择哪种玩法
				if($("li[data-type=1]").text() == '欧赔'){var gameType = 1}
				if($("li[data-type=1]").text() == '亚盘'){var gameType = 2}
				if($("li[data-type=1]").text() == '大小球'){var gameType = 3}
				//判断选择那几个公司
				var arr = [];
				$("li[data-id=1]").each(function(){	
					if($(this).attr('data-id')==1){
						var a = $(this).text();
						if(a == '利记'){a = 'lj';}
						if(a == '澳彩'){a = 'ms';}
						if(a == '智博'){a = 'bw';}
						if(a == '皇冠'){a = 'hg';}
						if(a == '浩博'){a = 'hb';}
						if(a == '沙巴'){a = 'sb';}	 				
					}
					arr.push(a);
				})
				var tdms = arr.join();
//				//日期筛选
//				var myDate = new Date(); 
//				var years = myDate.getFullYear();
//				var yue = $('.livezs-data div:eq(0)').text().substr(5,2);
//				var ri = $('.livezs-data div:eq(0)').text().substr(8,2);
//				var oTime = (years+"-"+yue+"-"+ri);
//				console.log(oTime);
//				console.log(playStat)
				//console.log(oTime);
				//获取联赛数据
				getSet({playStat:playStat}, function(data) {
				
					//console.log(666);
					//获取热门联赛ID
					var arr = [];
					for(var i = 0; i < data.length; i++) {
							arr.push(data[i].id);
					}
					
					var leagues= arr.join();
					$("#set").hide();
					$("#index_top").show();
					$(".box-one").empty();
					$(".box-two").empty();
					$(".box-three").empty();
					if(playStat == 0){loader("show",$(".box-one"));}
					if(playStat == 2){loader("show",$(".box-two"));}
					if(playStat == 1){loader("show",$(".box-three"));}
					
					get_future({leagues:leagues,gameType:gameType,tdms:tdms,playStat:playStat},function(data){
						if(data == '' && playStat == 0){}
						getFuture(data,playStat,gameType);
					});
				})
			}					
		})		
	//获取指数页面筛选日期数据
	//获取指数日历数据
	function get_rili(){
		var myDate = new Date();
		var years = myDate.getFullYear();
		var months = myDate.getMonth() + 1;
		var days = myDate.getDate();
		var week = myDate.getDay();
		//获取总的毫秒数
		var minutes = myDate.getTime();
		//获取当前日期
		var now_date = myDate.getDate();
		//获取一天毫秒数
		var mb = 86400000;
		//console.log(minutes-2*ms);
		function arr(time) {
			//根据毫秒数，转化为固定的时间
			var newTime = new Date(time);
			//console.log(newTime);
			//将日期部分转化为字符串
			var str_time = newTime.toDateString();
			//console.log(str_time);
			var arr_time = str_time.split(" ");
			//console.log(arr_time);
			return arr_time;
		}
	
		//console.log(arr(minutes)[2]);	
	
		var oTime = (years + "-" + months + "-" + days);
		//console.log(oTime);
		//获取当前星期
		function pan(str){
			if(str == 'Mon'){str = '周一'}
			if(str == 'Tue'){str = '周二'}
			if(str =='Wed'){str = '周三'}
			if(str == 'Thu'){str = '周四'}
			if(str == 'Fri'){str = '周五'}
			if(str == 'Sat'){str = '周六'}
			if(str == 'Sun'){str = '周日'}
			return str;
		}
		//初始化未开赛弹出层日期数据
		if($("li[class='livezs-on']").text() == '未开赛'){
			var in_title = '近七天未开赛赛事';
			//获取当前天数
			var	last_date = arr(minutes)[2];
			next_date_1 = arr(minutes + mb)[2];
			next_date_2 = arr(minutes + 2 * mb)[2];
			next_date_3 = arr(minutes + 3 * mb)[2];
			next_date_4 = arr(minutes + 4 *mb)[2];
			next_date_5 = arr(minutes + 5 * mb)[2];
			next_date_6 = arr(minutes + 6 * mb)[2];
			next_date_7 = arr(minutes + 7 * mb)[2];
			
			day_time = arr(minutes)[0];
			pan(day_time);
			next_day_1 = arr(minutes + mb)[0];
			pan(next_day_1);
			next_day_2 = arr(minutes + 2 * mb)[0];
			pan(next_day_2);
			next_day_3 = arr(minutes + 3 * mb)[0];
			pan(next_day_3);
			next_day_4 = arr(minutes + 4 * mb)[0];
			pan(next_day_4);
			next_day_5 = arr(minutes + 5 * mb)[0];
			pan(next_day_5);
			next_day_6 = arr(minutes + 6 * mb)[0];
			pan(next_day_6);
			next_day_7 = arr(minutes + 7 * mb)[0];
			pan(next_day_7);
			//获取当前月份
			month_n = arr(minutes)[1];
			next_month_1 = arr(minutes + mb)[1];
			next_month_2 = arr(minutes + 2 * mb)[1];
			next_month_3 = arr(minutes + 3 * mb)[1];
			next_month_4 = arr(minutes + 4 *mb)[1];
			next_month_5 = arr(minutes + 5 * mb)[1];
			next_month_6 = arr(minutes + 6 * mb)[1];
			next_month_7 = arr(minutes + 7 * mb)[1];
			
		}else if($("li[class='livezs-on']").text() == '完场'){
			var in_title = '近七天完场赛事';
			var	last_date = arr(minutes)[2];
			next_date_1 = arr(minutes - mb)[2];
			next_date_2 = arr(minutes - 2 * mb)[2];
			next_date_3 = arr(minutes - 3 * mb)[2];
			next_date_4 = arr(minutes - 4 *mb)[2];
			next_date_5 = arr(minutes - 5 * mb)[2];
			next_date_6 = arr(minutes - 6 * mb)[2];
			next_date_7 = arr(minutes - 7 * mb)[2];
			
			day_time = arr(minutes)[0];
			pan(day_time);
			next_day_1 = arr(minutes - mb)[0];
			pan(next_day_1);
			next_day_2 = arr(minutes - 2 * mb)[0];
			pan(next_day_2);
			next_day_3 = arr(minutes - 3 * mb)[0];
			pan(next_day_3);
			next_day_4 = arr(minutes - 4 * mb)[0];
			pan(next_day_4);
			next_day_5 = arr(minutes - 5 * mb)[0];
			pan(next_day_5);
			next_day_6 = arr(minutes - 6 * mb)[0];
			pan(next_day_6);
			next_day_7 = arr(minutes - 7 * mb)[0];
			pan(next_day_7);
			//获取当前月份
			month_n = arr(minutes)[1];
			next_month_1 = arr(minutes - mb)[1];
			next_month_2 = arr(minutes - 2 * mb)[1];
			next_month_3 = arr(minutes - 3 * mb)[1];
			next_month_4 = arr(minutes - 4 *mb)[1];
			next_month_5 = arr(minutes - 5 * mb)[1];
			next_month_6 = arr(minutes - 6 * mb)[1];
			next_month_7 = arr(minutes - 7 * mb)[1];
		}
		var str= '';
		str='<li>'+in_title+'</li><li class="mast-on">最近</li><li><span>'+next_month_1+'</span>月<b>'+next_date_1+'</b>日<i>'+pan(next_day_1)+'</i></li><li><span>'+next_month_2+'</span>月<b>'+next_date_2+'</b>日<i>'+pan(next_day_2)+'</i></li><li><span>'+next_month_3+'</span>月<b>'+next_date_3+'</b>日<i>'+pan(next_day_3)+'</i></li><li><span>'+next_month_4+'</span>月<b>'+next_date_4+'</b>日<i>'+pan(next_day_4)+'</i></li><li><span>'+next_month_5+'</span>月<b>'+next_date_5+'</b>日<i>'+pan(next_day_5)+'</i></li><li><span>'+next_month_6+'</span>月<b>'+next_date_6+'</b>日<i>'+pan(next_day_6)+'</i></li><li><span>'+next_month_7+'</span>月<b>'+next_date_7+'</b>日<i>'+pan(next_day_7)+'</i></li>';
		$(".mast-tab").empty();
		$(".mast-tab").append(str);
		for(var i =2 ; i<=8; i++){
			if($(".mast-tab li").eq(i).find('span').text()=='Jan'){$(".mast-tab li").eq(i).find('span').text('1')};
			if($(".mast-tab li").eq(i).find('span').text()=='Feb'){$(".mast-tab li").eq(i).find('span').text('2')};
			if($(".mast-tab li").eq(i).find('span').text()=='Mar'){$(".mast-tab li").eq(i).find('span').text('3')};
			if($(".mast-tab li").eq(i).find('span').text()=='Apr'){$(".mast-tab li").eq(i).find('span').text('4')};
			if($(".mast-tab li").eq(i).find('span').text()=='May'){$(".mast-tab li").eq(i).find('span').text('5')};
			if($(".mast-tab li").eq(i).find('span').text()=='Jun'){$(".mast-tab li").eq(i).find('span').text('6')};
			if($(".mast-tab li").eq(i).find('span').text()=='Jul'){$(".mast-tab li").eq(i).find('span').text('7')};
			if($(".mast-tab li").eq(i).find('span').text()=='Aug'){$(".mast-tab li").eq(i).find('span').text('8')};
			if($(".mast-tab li").eq(i).find('span').text()=='Sep'){$(".mast-tab li").eq(i).find('span').text('9')};
			if($(".mast-tab li").eq(i).find('span').text()=='Oct'){$(".mast-tab li").eq(i).find('span').text('10')};
			if($(".mast-tab li").eq(i).find('span').text()=='Nov'){$(".mast-tab li").eq(i).find('span').text('11')};
			if($(".mast-tab li").eq(i).find('span').text()=='Dec'){$(".mast-tab li").eq(i).find('span').text('12')};
		}
		
	}
	
	//加载loading动画		
	function loader (val,dom){
        $("#loader").remove();
       // console.log(dom);
        if (!val||val=="hide") return false;
        var h ='<div class="loader" id="loader">加载中</div>';
        var dom = dom || $("body");
        dom.append(h);
        return false;
    }	
    //页面为空显示图片
    function kong_zhi(a,b){
        var b = b || ""
        return '<div class="kong_zhi">'+a+'</div>';
    }
	//点击日期选择
	function click_calender(){
		$('.livezs-box #live-btn').each(function(){
			
			//点击日期遮罩层出现
			$(this).click(function(){
				//初始化指数页面筛选日期数据
				//console.log(666);
				get_rili();
				$("#live-mask").toggle();
				$("body,html").css({"overflow":"hidden"});
			})	
			$("#mast-cloe").click(function(){
				$("#live-mask").hide();
				$("body,html").css({"overflow":"visible"});
			})
		})
		
	}
	//初始化index页面筛选规则
	function getSet(obj,fn){
		if(obj.oTime){
			var url = 'http://api1.310data.com/interface/v2/odds/getLeagues?playStat='+obj.playStat+'&day='+obj.oTime;
		}else{
			var url = 'http://api1.310data.com/interface/v2/odds/getLeagues?playStat='+obj.playStat;
		}
		
		console.log(url);
		getData(url, fn);
	}
	//初始化living头部数据
	function living_top(matchId,data_time,time,zhu,ke,sai,hs,bhs,as,bas,state,onIng){
		//console.log(matchId);
		var o_matchId = matchId;
		var data_time = data_time;
		//console.log(data_time);
		var time = time;
		var zhu = zhu;
		var ke = ke;
		var sai = sai;
		var hs = hs;
		var as = as;
		var bhs = bhs;
		var bas = bas;
		var state = state;
		var onIng = onIng;
		if(state == 2){var zhu_score = hs;var ke_score = as;var ban_zhu =bhs;var ban_ke = bas;var vs=':';var zuo='(';var mao = ':';var you = ')';}
		if(state == 1){var zhu_score = hs;var ke_score = as;var ban_zhu =bhs;var ban_ke = bas;onIng='完赛';vs=':';var zuo='(';var mao = ':';var you = ')'; }
		if(state == 0){var zhu_score = '';var ke_score = '';var ban_zhu ='';var ban_ke = '';onIng='未开赛';vs='vs';var zuo='';var mao = '';var you = '';}
		var str_header = '<h1>'+sai+'</h1>';
		var str_top = '<div class="live-bro-name"><div>'+zhu+'</div></div><div class="live-bro-time"><div class="bro-time-list oh"><aside class="dl">'+data_time+'</aside><aside class="dl"><span>'+time+'</span></aside></div><div class="live-bro-bf oh"><span>'+zhu_score+'</span><span>'+vs+'</span><span>'+ke_score+'</span></div><div class="bro-name-half oh"><span>'+zuo+'</span><span>'+ban_zhu+'</span><span class="vs">'+mao+'</span><span>'+ban_ke+'</span><span>'+you+'</span></div><div class="bro-stoped" >'+onIng+'</div></div><div class="live-bro-name2">'+ke+'</div>';	
	        $('#header_top').append(str_top);
       		$(".header_sai").append(str_header);
	}
	
	//初始化living头部数据
	function living_topp(matchId,data_time,time,zhu,ke,sai,hs,bhs,as,bas,state,onIng,gt){
		//console.log(matchId);
		var o_matchId = matchId;
		var data_time = data_time;
		//console.log(data_time);
		var time = time;
		var zhu = zhu;
		var ke = ke;
		var sai = sai;
		var hs = hs;
		var as = as;
		var bhs = bhs;
		var bas = bas;
		var state = state;
		var onIng = onIng;
		if(state == 3){var zhu_score = hs;var ke_score = as;var ban_zhu =bhs;var ban_ke = bas;var vs=':';var zuo='(';var mao = ':';var you = ')';}
		if(state == 1){var zhu_score = hs;var ke_score = as;var ban_zhu =bhs;var ban_ke = bas;onIng='完赛';vs=':';var zuo='(';var mao = ':';var you = ')'; }
		if(state == 0){var zhu_score = '';var ke_score = '';var ban_zhu ='';var ban_ke = '';onIng='未开赛';vs='vs';var zuo='';var mao = '';var you = '';}
		var str_header = '<h1>'+sai+'</h1>';
		var str_top = '<div class="live-bro-name"><div>'+zhu+'</div></div><div class="live-bro-time"><div class="bro-time-list oh"><aside class="dl">'+data_time+'</aside><aside class="dl"><span>'+time+'</span></aside></div><div class="live-bro-bf oh"><span>'+zhu_score+'</span><span>'+vs+'</span><span>'+ke_score+'</span></div><div class="bro-name-half oh"><span>'+zuo+'</span><span>'+ban_zhu+'</span><span class="vs">'+mao+'</span><span>'+ban_ke+'</span><span>'+you+'</span></div><div class="bro-stoped" >'+onIng+'</div></div><div class="live-bro-name2">'+ke+'</div>';	
	        $('#header_top').append(str_top);
       		$(".header_sai").append(str_header);
	}
	//获取球队统计数据
	function getData_statistics(obj, fn){
		var url = 'http://api1.310data.com/interface/match/matchStatic/'+obj.matchId;
		//console.log(url);
		getData(url, fn);
	}
	//初始化odds.html红黄牌
	function sign(o_matchId){
		var matchId = o_matchId;
		getData_statistics({matchId:matchId},function(data){
			//console.log(data);
			var str_statistics = '';
			var str_jiao = '';
			var str_hong = '';
			
			var k_str_statistics = '';
			var k_str_jiao = '';
			var k_str_hong = '';
		
			for(var i = 0; i < data.length; i++){
				
				var code_id = data[i].staticType;
				//主队红黄牌角球数据
				if(code_id == "1034-2058"){
					if(data[i].homeData){
						str_statistics = '<span>'+data[i].homeData+'</span>';	
						$(".huangL").text('');
						$(".huangL").append(str_statistics);
					}else{}
				}
				if(code_id == "1025-2049"){
					//console.log(666);
					if(data[i].homeData){
						str_jiao = '<span>'+data[i].homeData+'</span>';	
						$(".jiaoL").text('');
						$(".jiaoL").append(str_jiao);
					}else{}
				}
				if(code_id == "1032-2056"){
					//console.log(666);
					//console.log(666);
					if(data[i].homeData){
						str_hong = '<span>'+data[i].homeData+'</span>';
						$(".redL").text('');
						$(".redL").append(str_hong);
					}else{}
					
				}
				//客队红黄牌角球数据
				if(code_id == "1034-2058"){
					if(data[i].awayData){
						 k_str_statistics = '<span>'+data[i].awayData+'</span>';	
						  $(".huangR").text('');
						$(".huangR").append(k_str_statistics);
					}else{}
				}
				if(code_id == "1025-2049"){
					if(data[i].awayData){
						//console.log(666);
						 k_str_jiao = '<span>'+data[i].awayData+'</span>';	
						 $(".jiaoR").text('');
						$(".jiaoR").append( k_str_jiao);
					}else{}
				}
				if(code_id == "1032-2056"){
					//console.log(666);
					//console.log(666);
					if(data[i].awayData){
						k_str_hong = '<span>'+data[i].awayData+'</span>';
						$(".huangR").text('');
						$(".huangR").append(k_str_hong);
					}else{}
					
				}
			}
		})
	}
	return {
		get_future : get_future,
		getFuture : getFuture,
		confirm : confirm,
		setUp : setUp,
		loader : loader,
		get_rili : get_rili,
		getData_fix_company : getData_fix_company,
		kong_zhi :  kong_zhi,
		getSet : getSet,
		href : href,
		living_top : living_top,
		sign : sign,
		living_topp : living_topp
		
	}
})