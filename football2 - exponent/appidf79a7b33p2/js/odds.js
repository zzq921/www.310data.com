define(function(require, exports, module) {
	var $ = require("jquery");
	var getD = require("getData");
	var e = require("event");
	var od = require("oddData");
	var href = getD.href();
	//初始化头部
	var matchId = href.mid;
	var data_time = href.ri_qi;
	var time = href.shi_time;
	var zhu =decodeURI(href.zhu);	
	var ke = decodeURI(href.ke);
	var sai = decodeURI(href.sai);
	var hs = href.hs;
	var as = href.as;
	var bhs = href.bhs;
	var bas = href.bas;
	var state = href.state;
	var onIng = decodeURI(href.onIng);
	var gt = href.gt;
	function init(){
		//初始化odds.html头部数据
		//console.log(matchId);
		if(gt){
			console.log(666);
			getD.living_top(matchId,data_time,time,zhu,ke,sai,hs,bhs,as,bas,state,onIng,gt);
			var gameType2 = gt;
			expo(gameType2);
			od.odds_tab(gameType2);
			//初始化红黄牌
			//初始化头部红黄牌
			var matchId1 = href.mid;
			getD.sign(matchId1);
			//odds.footer选项卡切换
			od.oddy_tab();
			//点击左上键返回
			e.odd_back(gt);
		}else{
			//console.log(777);
			getD.living_top(matchId,data_time,time,zhu,ke,sai,hs,bhs,as,bas,state,onIng);
			var gameType2 = href.gameType;
			expo(gameType2);
			od.odds_tab(gameType2);
			//初始化红黄牌
			//初始化头部红黄牌
			var matchId1 = href.mid;
			getD.sign(matchId1);
			//odds.footer选项卡切换
			od.oddy_tab();
			//点击左上键返回
			e.odd_back();
		}
			
		function expo(gameType2){
			//初始化odds.html亚盘数据
			//获取亚盘详情页数据
			var tdm2 = decodeURI(href.tdm);
			if(tdm2 == '利记'){tdm2 = 'lj'}
			if(tdm2 == '澳彩'){tdm2 = 'ms'}
			if(tdm2 == '智博'){tdm2 = 'bw'}
			if(tdm2 == '皇冠'){tdm2 = 'hg'}
			if(tdm2 == '浩博'){tdm2 = 'hb'}
			if(tdm2 == '沙巴'){tdm2 = 'sb'}
						
			//console.log(tdm2);
			var matchId2 = href.mid;
			//var gameType2 = href.gameType;
			//if(gameType2 = 1){$(".op").show();$(".ya").hide();$(".dx").hide();}
			od.getData_asian_all({tdm:tdm2,matchId:matchId2,gameType:gameType2},function(data){
				//console.log(data);
				var goodObj = od.ro();
				//console.log(goodObj.matchId);
				//console.log($(".zs-nav2 ul li:nth-child(1)").html());
				//详情页底部导航切换，数据变化
			//详情页底部导航切换，数据变化
			
					if($(".zs-nav2 ul li:nth-child(2)").html() == decodeURIComponent(goodObj.win)){
						
						//console.log($(".zs-nav2 ul li:nth-child(2)"));
						$(".zs-nav2 ul li:nth-child(2)").addClass("zs-on2").siblings().removeClass("zs-on2");
						$(".odd .op").show().siblings().hide();
					}else if($(".zs-nav2 ul li:nth-child(3)").html() == decodeURIComponent(goodObj.win)){
						$(".zs-nav2 ul li:nth-child(3)").addClass("zs-on2").siblings().removeClass("zs-on2");
						$(".odd .dx").show().siblings().hide();
					}else if($(".zs-nav2 ul li:nth-child(1)").html() == decodeURIComponent(goodObj.win)){
						$(".zs-nav2 ul li:nth-child(1)").addClass("zs-on2").siblings().removeClass("zs-on2");
						$(".odd .ya").show().siblings().hide();
					}else{};
					$(data).each(function(){
								//console.log(this.lj);
						for(var key in data){
							name = key;	
						}
						//console.log(name);			
						if(name == 'lj'){
									//console.log(data.lj);
							od.pushData1(data.lj);
							$(".yp-nav li:contains('利记')").addClass("pl-on").siblings().removeClass('pl-on');
						}else if(name == 'ms'){
							od.pushData2(data.ms);
							$(".yp-nav li:contains('澳彩')").addClass("pl-on").siblings().removeClass('pl-on');
						}else if(name == 'bw'){
							od.pushData3(data.bw);
							$(".yp-nav li:contains('智博')").addClass("pl-on").siblings().removeClass('pl-on');
						}else if(name == 'hg'){
							//console.log(data.hg);
							od.pushData4(data.hg);
							$(".yp-nav li:contains('皇冠')").addClass("pl-on").siblings().removeClass('pl-on');
						}else if(name == 'hb'){		
							od.pushData5(data.hb);
							$(".yp-nav li:contains('浩博')").addClass("pl-on").siblings().removeClass('pl-on');
						}
						else if(name == 'sb'){
							od.pushData6(data.sb);
							$(".yp-nav li:contains('沙巴')").addClass("pl-on").siblings().removeClass('pl-on');
						}else{}	
		
					})
			});
		}
	
	}
	return {
		init : init
	}
})