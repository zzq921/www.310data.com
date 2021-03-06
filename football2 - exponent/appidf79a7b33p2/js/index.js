define(function(require, exports, module) {
	var $ = require("jquery");
	var getD = require("getData");
	var e = require("event");
	var href = getD.href();
	function init(){
		getD.loader("show",$(".box-one"));
		if(!window.localStorage.leagues && !window.localStorage.matchId && !window.localStorage.tmd){
			var	gameType = '2';
			var tdms = 'lj,sb';
			var playStat = 0;
			//console.log(666);
			//获取全部联赛id		
			getD.getSet({playStat:playStat}, function(data) {
				
				//获取热门联赛ID
				var arr = [];
				for(var i = 0; i < data.length; i++) {
					if(data[i].matchCount != 0){
						arr.push(data[i].id);
					}		
				}
				var leagues = arr.join();
				//console.log(leagues);
				init_data(gameType,tdms,playStat,leagues)
			});
		}
		else{
			
			var tdms = localStorage.getItem('tdms');
			var gameType = localStorage.getItem('gameType');
			var playStat = localStorage.getItem('playStat');
			var leagues = localStorage.getItem('leagues');
			var Time = localStorage.getItem('Time');
			var matchId = localStorage.getItem('matchId');
			//localStorage.clear();
			//初始化界面
			if(playStat == 2){
				var playStat = 2;
				getD.get_future({leagues:leagues,gameType:gameType,tdms:tdms,playStat:playStat,oTime:Time},function(data){
					
					for(var i = 0;i < data.length;i++){
						
						if(data[i].id == matchId){
							if(data[i].playstateId == 3&&playStat == 2){
								var playstateId = data[i].playstateId;
								var oTime = '';
								$(".live-tabs li:eq(1)").addClass("livezs-on").siblings().removeClass("livezs-on");$("#index_top .livezs-box:eq(1)").show().siblings().hide(),$("#header-fix").show();
								init_data(gameType,tdms,playStat,leagues,Time,playstateId);
							}
							if(data[i].playstateId == 0&&playStat ==2){
								var playstateId = data[i].playstateId;
								var oTime = '';
								$(".live-tabs li:eq(1)").addClass("livezs-on").siblings().removeClass("livezs-on");$("#index_top .livezs-box:eq(1)").show().siblings().hide(),$("#header-fix").show();
								init_data(gameType,tdms,playStat,leagues,Time,playstateId);
							}
							
						}else{
							ending();
						}
					}
				})
			}
			if(playStat == 0){console.log(0);var oTime = Time;$(".live-tabs li:eq(0)").addClass("livezs-on").siblings().removeClass("livezs-on");$("#index_top .livezs-box:eq(0)").show().siblings().hide(),$("#header-fix").show();}
			if(playStat == 1){console.log(1);var oTime = Time;$(".live-tabs li:eq(2)").addClass("livezs-on").siblings().removeClass("livezs-on");$("#index_top .livezs-box:eq(2)").show().siblings().hide(),$("#header-fix").show();}
			//初始化公司样式

			var tdms = tdms.split(',');
			//console.log(tdms);
			for(var i = 0;i < tdms.length;i++){
				if($(".filter-box li:eq(0)").attr("data-tdm")==tdms[i]){
					$(".filter-box li:eq(0)").addClass("fil-hove").attr("data-id","1");
					//console.log(0);
				}else{
					$(".filter-box li:eq(0)").removeClass("fil-hove").attr("data-id","0");
				}
				if($(".filter-box li:eq(1)").attr("data-tdm")==tdms[i]){
					$(".filter-box li:eq(1)").addClass("fil-hove").attr("data-id","1");
					//console.log(1);
				}if($(".filter-box li:eq(2)").attr("data-tdm")==tdms[i]){
					$(".filter-box li:eq(2)").addClass("fil-hove").attr("data-id","1");
					//console.log(2);
				}if($(".filter-box li:eq(3)").attr("data-tdm")==tdms[i]){
					$(".filter-box li:eq(3)").addClass("fil-hove").attr("data-id","1");
					//console.log(3);
				}if($(".filter-box li:eq(4)").attr("data-tdm")==tdms[i]){
					$(".filter-box li:eq(4)").addClass("fil-hove").attr("data-id","1");
					//console.log(4);
				}if($(".filter-box li:eq(5)").attr("data-tdm")==tdms[i]){
					$(".filter-box li:eq(5)").addClass("fil-hove").attr("data-id","1");
					//console.log(5);
				}else{$(".filter-box li:eq(5)").removeClass("fil-hove").attr("data-id","0");}
			}
			
			init_data(gameType,tdms,playStat,leagues,Time);
				
		}
	
		function ending(){
				getD.get_instant({leagues:leagues,gameType:gameType,tdm:tdm,playStat:'1',oTime:Time},function(data){
					console.log(leagues);
					for(var i = 0;i < data.length;i++){
						
						if(data[i].id == matchId){
							//console.log(data[i].playstateId);
							//console.log(playStat);
							if(data[i].playstateId == 1&&playStat==2){
								var playstateId = data[i].playstateId;
								var oTime = '';
								
								$(".live-tabs li:eq(2)").addClass("livezs-on").siblings().removeClass("livezs-on");$("#index_top .footb-box:eq(2)").show().siblings().hide(),$("#header-fix").show();
								init_data(gameType,tdm,playStat,Time,leagues,playstateId);
							}
							
						}else{
							
						}
					}
				})
			}	
		function init_data(gameType,tdms,playStat,leagues,Time,playstateId){
			
			click_wei();
			click_circle();
			click_end();		
			getD.get_future({playstateId:playstateId,leagues:leagues,gameType:gameType,tdms:tdms,playStat:playStat,oTime :Time},function(data){
				
				if(data.length === 0) {
					if(playStat == 0){
						$(".box-one").empty();return $(".box-one").html(getD.kong_zhi("<img src='img/kong.png'>","暂无数据"));
					}if(playStat == 2){
						$(".box-two").empty();return $(".box-two").html(getD.kong_zhi("<img src='img/kong.png'>","暂无数据"));
					}
					if(playStat == 1){
						$(".box-three").empty();return $(".box-three").html(getD.kong_zhi("<img src='img/kong.png'>","暂无数据"));
					}
				}else{
					
					getD.getFuture(data,playStat,gameType,playstateId)
				}
				
			});
			//点击头部未开赛调取数据
			
			function click_wei(){
				$(".live-tabs ul").on("click","li:nth-of-type(1)",function(){
					$(".box-one").empty();
					getD.loader("show",$(".box-one"));

					if(localStorage.length == 0){
						console.log(666);
						if($("li[data-type=1]").text() == '欧赔'){var gameType = 1}
						if($("li[data-type=1]").text() == '亚盘'){var gameType = 2}
						if($("li[data-type=1]").text() == '大小球'){var gameType = 3}
						var arr = [];
						$("li[data-id=1]").each(function(){
							if($(this).attr('data-id')==1){
								var tdms = $(this).text();
								if(tdms == '利记'){tdms = 'lj';}
								if(tdms == '澳彩'){tdms = 'ms';}
								if(tdms == '智博'){tdms = 'bw';}
								if(tdms == '皇冠'){tdms = 'hg';}
								if(tdms == '浩博'){tdms = 'hb';}
								if(tdms == '沙巴'){tdms = 'sb';}			
							}
							arr.push(tdms);
						})
						var tdms = arr.join();
						var playStat = 0;
						getD.getSet({playStat:playStat}, function(data) {
							//console.log(data);
							//获取热门联赛ID
							var arr = [];
							for(var i = 0; i < data.length; i++) {
								if(data[i].matchCount != 0){
									arr.push(data[i].id);
								}		
							}
							var leagues = arr.join();
							sai(leagues,gameType,tdms,playStat);
						});
					}else{
						var playStat = 0;
						var tdms = localStorage.getItem('tdms');
						var gameType = localStorage.getItem('gameType');
						//var leagues = localStorage.getItem('leagues');
						var oTime = localStorage.getItem('mon');
						getD.getSet({playStat:playStat}, function(data) {
				
							//获取热门联赛ID
							var arr = [];
							for(var i = 0; i < data.length; i++) {
								if(data[i].matchCount == 0 || data[i].matchCount == 1){
									arr.push(data[i].id);
								}		
							}
							var leagues = arr.join();
							//console.log(leagues);
							sai(leagues,gameType,tdms,playStat,Time);
						});
						
					}
					function sai(leagues,gameType,tdms,playStat,Time){
						getD.get_future({leagues:leagues,gameType:gameType,tdms:tdms,playStat:playStat,Time:oTime},function(data){
							if(data == '') {
								$(".box-one").empty();return $(".box-one").html(getD.kong_zhi("<img src='img/kong.png'>","暂无数据"));
							}
							getD.getFuture(data,playStat,gameType)
						});
					}
					
				})
			}
			//点击头部滚球调取数据
			
			function click_circle(){
				$(".live-tabs ul").on("click","li:nth-of-type(2)",function(){
					$(".box-two").empty();
					getD.loader("show",$(".box-two"));
					
					if(localStorage.length == 0){
						if($("li[data-type=1]").text() == '欧赔'){var gameType = 1}
						if($("li[data-type=1]").text() == '亚盘'){var gameType = 2}
						if($("li[data-type=1]").text() == '大小球'){var gameType = 3}
						var arr = [];
						$("li[data-id=1]").each(function(){
							if($(this).attr('data-id')==1){
								var tdms = $(this).text();
								if(tdms == '利记'){tdms = 'lj';}
								if(tdms == '澳彩'){tdms = 'ms';}
								if(tdms == '智博'){tdms = 'bw';}
								if(tdms == '皇冠'){tdms = 'hg';}
								if(tdms == '浩博'){tdms = 'hb';}
								if(tdms == '沙巴'){tdms = 'sb';}			
							}
							arr.push(tdms);
						})
						var tdms = arr.join();
						var playStat = 2;
						getD.getSet({playStat:playStat}, function(data) {
							//console.log(data);
							//获取热门联赛ID
							var arr = [];
							for(var i = 0; i < data.length; i++) {
								if(data[i].matchCount == 0){
									arr.push(data[i].id);
								}		
							}
							var leagues = arr.join();
						//	console.log(leagues);
							gun(leagues,gameType,tdms,playStat);
						});
					}else{
						
						var playStat = 2;
						var tdms = localStorage.getItem('tdms');
						var gameType = localStorage.getItem('gameType');
						//var leagues = localStorage.getItem('leagues');
						getD.getSet({playStat:playStat}, function(data) {
				
							//获取热门联赛ID
							var arr = [];
							for(var i = 0; i < data.length; i++) {
								if(data[i].matchCount != 0){
									arr.push(data[i].id);
								}		
							}
							var leagues = arr.join();
							//console.log(leagues);
							gun(leagues,gameType,tdms,playStat);
						});
						
					}
					function gun(leagues,gameType,tdms,playStat){
						
							getD.get_future({leagues:leagues,gameType:gameType,tdms:tdms,playStat:playStat},function(data){
								//console.log(data);
								if(data == '') {
									$(".box-two").empty();return $(".box-two").html(getD.kong_zhi("<img src='img/kong.png'>","暂无数据"));
								}
								
								getD.getFuture(data,playStat,gameType)
							});
						
					}
				})
			}
			//点击头部完场调取数据
			
			function click_end(){
						
				$(".live-tabs ul").on("click","li:nth-of-type(3)",function(){
					$(".box-three").empty();
					getD.loader("show",$(".box-three"));
						
					if(localStorage.length == 0){
						
						if($("li[data-type=1]").text() == '欧赔'){var gameType = 1}
						if($("li[data-type=1]").text() == '亚盘'){var gameType = 2}
						if($("li[data-type=1]").text() == '大小球'){var gameType = 3}
						var arr = [];
						$("li[data-id=1]").each(function(){
							if($(this).attr('data-id')==1){
								var tdms = $(this).text();
								if(tdms == '利记'){tdms = 'lj';}
								if(tdms == '澳彩'){tdms = 'ms';}
								if(tdms == '智博'){tdms = 'bw';}
								if(tdms == '皇冠'){tdms = 'hg';}
								if(tdms == '浩博'){tdms = 'hb';}
								if(tdms == '沙巴'){tdms = 'sb';}			
							}
							arr.push(tdms);
						})
						var tdms = arr.join();
						var playStat = 1;
						getD.getSet({playStat:playStat}, function(data) {
							//console.log(data);
							//获取热门联赛ID
							var arr = [];
							for(var i = 0; i < data.length; i++) {
								if(data[i].matchCount != 0){
									arr.push(data[i].id);
								}		
							}
							var leagues = arr.join();
							console.log(leagues);
							wan(leagues,gameType,tdms,playStat);
						});
					}else{
						var tdms = localStorage.getItem('tdms');
						var gameType = localStorage.getItem('gameType');
						
						//var leagues = localStorage.getItem('leagues');
						var Time = localStorage.getItem('Time');

						var playStat = 1;
						getD.getSet({playStat:playStat}, function(data) {
				
							//获取热门联赛ID
							var arr = [];
							for(var i = 0; i < data.length; i++) {
								if(data[i].matchCount != 0){
									arr.push(data[i].id);
								}		
							}
							var leagues = arr.join();
							//console.log(leagues);
							wan(leagues,gameType,tdms,playStat,Time);
						});
						
					}
					function wan(leagues,gameType,tdms,playStat,Time){
						getD.get_future({leagues:leagues,gameType:gameType,tdms:tdms,playStat:playStat,oTime:Time},function(data){
							if(data == '') {
								$(".box-three").empty();return $(".box-three").html(getD.kong_zhi("<img src='img/kong.png'>","暂无数据"));
							}
							getD.getFuture(data,playStat,gameType)
						});
					}
				})
			}
		}
		//指数header选项卡点击切换
		e.bt();
		//点击设置
		getD.setUp();
		//指数页面筛选日期选项卡点击切换及调取数据
		e.cli_data();
		//指数主页筛选页面事件
		e.select_page();
		e.cli_select();
		//点击每一天联赛的赔率，跳转页面
		e.click_odds();
		//点击主页赔率返回按钮，返回大主页
		e.index_back();
	}
	return {
		init : init
	}
})