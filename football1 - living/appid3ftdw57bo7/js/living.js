define(function(require, exports, module) {
	var $ = require("jquery");
	var e = require("event");
	var a = require("getData");
	var href = a.href();
	//初始化头部
	var matchId = href.matchId;
	var data_time = href.data_time;
	var time = href.time;
	var zhu =decodeURI(href.zhu);	
	var ke = decodeURI(href.ke);
	var sai = decodeURI(href.sai);
	var hs = href.hs;
	var as = href.as;
	var bhs = href.bhs;
	var bas = href.bas;
	var state = href.state;
	var onIng = decodeURI(href.onIng);
	var pl = href.pl;
	var pid = href.pid;
	function init() {
		//初始化living头部数据
		if(pl){
			//console.log(666);
			a.living_topp(matchId,data_time,time,zhu,ke,sai,hs,bhs,as,bas,onIng,pl);
		}else{
			//console.log(777);
			a.living_top(matchId,data_time,time,zhu,ke,sai,hs,bhs,as,bas,state,onIng,pid);
		}
		
		//初始化红黄牌
		//初始化头部红黄牌
		var matchId1 = href.matchId;
		a.sign(matchId1);
		//初始化阵容界面数据
		//a.loader("show",$(".oImg_zhen"));
		var matchId1 = href.matchId;
		a.battle_array(matchId1);
		//初始化统计数据
		$(".zb-fot-nav li:eq(1)").click(function(){
			var matchId1 = href.matchId;
			a.statistics_r(matchId1);
		})
		//初始化文字页面数据
		$(".zb-fot-nav li:eq(2)").click(function(){
			var matchId1 = href.matchId;
			a.character_init(matchId1)	
			setInterval(function(){
				a.character_init(matchId1)
			},6000);
		})
		//初始化事件直播页面数据
		$(".zb-fot-nav li:eq(3)").click(function(){
			var matchId1 = href.matchId;
			var filters = '1055,1032,1034,1029,2077,2053,2056,2058';
			a.event_init(matchId1, filters)
			setInterval(function() {
				a.event_init(matchId1, filters)
			}, 6000);
		})
		//初始化走势页面
		$(".zb-fot-nav li:eq(4)").click(function(){
			
			//不进行五分钟统计
			var needStatic1 = 'false';
			//进行五分钟统计
			var needStatic2 = 'true';
			//初始化走势页面角球的表格
			var matchId1 = href.matchId;
			
			a.loader("show",$("#main1"));
			//console.log(matchId1);
			a.jiao_init1(matchId1, needStatic1, needStatic2)
			//初始化走势页面进攻的表格
			a.jin_init2(matchId1, needStatic1, needStatic2);
		})
		//footer选项卡切换
		e.footerTab();
		//living左上角返回
		e.living_fan();
		
	}
	return {
		init : init
	}
})