$(function(){
	//搜索切换
	(function(){
		var aLi = $('#menu li');
		var oText = $('.form').find('.text');
		
		var arrText = [
			'例如：和唐毓芳烧鱼 或樱花日本料理',
			'例如：昌平区育新站龙骑广场2号楼609是',
			'例如：万达影院双人情侣卷',
			'例如：东莞出事了，大佬辜是谁？',
			'例如：北京初春降雪，天气变换莫测'
		];
		
		var iNow = 0;
		
		oText.val(arrText[0]);
		
		aLi.each(function(index){
			$(this).click(function(){
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				iNow = index;
				oText.val(arrText[iNow]);
			});
		});
		
		oText.focus( function(){
			
			if($(this).val()==arrText[iNow]){
				$(this).val('');
			}
			
		});
		
		oText.blur( function(){
			
			if( $(this).val('')){
				oText.val(arrText[iNow]);
			}
			
		});
		
		
	})();
	
	
	//update 文字滚动
	
	(function(){
		
		var oUpdate = $('.update');
		var oUl = oUpdate.find('ul');
		
		var iH =0;
		var arrDate = new Array();
		
		
		
		arrDate = [
		{ 'name':'萱萱','time':4,'title':'那些灿烂华美的瞬间','url':'http://www.baidu.com'},
		{ 'name':'怅怅','time':5,'title':'广东涉嫌疑犯','url':'http://www.miaov.com/2013/#curriculum'},
		{ 'name':'萱萱','time':6,'title':'国泰网你付款时间的话','url':'http://www.miaov.com/2013/'},
		{ 'name':'怅怅','time':7,'title':'广东涉嫌疑犯','url':'http://www.miaov.com/2013/#curriculum'},
		{ 'name':'萱萱','time':8,'title':'那些灿烂华美的瞬间','url':'http://www.miaov.com/2013/'},
		{ 'name':'怅怅','time':9,'title':'广东涉嫌疑犯','url':'http://www.miaov.com/2013/#curriculum'},
		{ 'name':'萱萱','time':10,'title':'国泰网你付款时间的话','url':'http://www.miaov.com/2013/'},
		{ 'name':'怅怅','time':11,'title':'广东涉嫌疑犯','url':'http://www.miaov.com/2013/#curriculum'}
		];
		
		var str='';
		var oBtnUp = $('#updateUpBtn');
		var oBtnDown = $('#updateDownBtn');
		var iNow =0;
		var timer = null;
		for( var i=0; i<arrDate.length;i++){
			str+='<li><a href="'+arrDate[i].url+'"><strong>'+arrDate[i].name+'</strong><span>'+arrDate[i].time+'分钟前</span> 写了一篇新文章 ：'+arrDate[i].title+'...</a></li>'
		}
		oUl.html(str);
		iH = oUl.find('li').height();
		
		oBtnUp.click(function(){
			doMove(-1);
		});
		
		oBtnDown.click(function(){
			doMove(1);
		});
		
		oUpdate.hover(function(){
			clearInterval(timer);
		}, autoPlay);
		
		function autoPlay(){
			
			timer = setInterval(function(){
				doMove(-1);
				
			},2200);
			
			
		}
		autoPlay();
		
		function doMove(num){
			iNow +=num;
			
			
			if(Math.abs(iNow)>arrDate.length-1){
				iNow = 0;	
			}
			if(iNow>0){
				iNow = -(arrDate.length-1);
			}
			
			oUl.stop().animate({"top":iH*iNow},2200,'elasticOut');
		}
		
	})();
	
	
	//option 选项卡切换
	
	(function(){
		
		fnTab( $('.tabNav1'),$('.tabCon1'));
		fnTab( $('.tabNav2'),$('.tabCon2'));
		fnTab( $('.tabNav3'),$('.tabCon3'));
		fnTab( $('.tabNav4'),$('.tabCon4'));
	
		function fnTab( oNav,aCon){
			
			var aElem = oNav.children();//子元素
			aCon.hide().eq(0).show();
			
			aElem.each(function(index){
				
				$(this).click(function(){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					
					aElem.find('a').attr('class','triangle_down_gray');
					$(this).find('a').attr('class','triangle_down_red');
					
					aCon.hide().eq(index).show();
					
				});
			});
			
			
		}
	})();
	
	
	//自动播放的焦点图
	(function(){
		
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		
		var arr = ['爸爸去哪了~','人像摄影中的光影感','娇柔美艳'];
		var iNow = 0;
		fnFade();

		var timer=null;
		aOlLi.click(function(){
			iNow=$(this).index();
			fnFade();
		});
		oDiv.hover(function(){
			clearInterval(timer);
		},function(){
			autoPlay();
		});
		function autoPlay(){
			
			timer = setInterval(function(){
				iNow++;
				iNow%= arr.length;
				fnFade();
				
			},2000);
		}
		autoPlay();
		
		function fnFade(){
			aUlLi.each(function(i){
				if( i!=iNow){
					aUlLi.eq(i).fadeOut().css('z-index',1);
					aOlLi.eq(i).removeClass('active');
				}else{
					aUlLi.eq(i).fadeIn().css('z-index',2);
					aOlLi.eq(i).addClass('active');
				}
			})
			
			oP.text(arr[iNow]);
			
		}
		
	})();
	
	//日历提示说明
	(function(){
		
		var aSpan = $('.canlendar h3 span');
		var aImg = $('.canlendar .img');
		var oPrompt = $('.today_info');
		var oImg = oPrompt.find('img');
		var oStrong= oPrompt.find('strong');
		var oP = oPrompt.find('p');
		
		aImg.hover(function(){
			var iTop=$(this).parent().position().top-30;
			var iLeft=$(this).parent().position().left+55;
			var index = $(this).parent().index()%(aSpan.length);
			console.log(index);
			
			oPrompt.show().css({'left':iLeft,'top':iTop});
			oP.text($(this).attr('info'));
			oImg.attr('src',$(this).attr('src'));
			oStrong.text(aSpan.eq(index).html());
			
		
		},function(){
			oPrompt.css('display','none');
		});
		
	})();

	//BBS高亮
	(function(){
		$('.bbs ol li').mouseover(function(){
			$('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active');
		});
		
	})();
	
	
	//红人热点HOT鼠标提示效果
	
	(function(){
		
		var arr = [
		'',
		'用户1<br/>人气1',
		'用户名：性感宝贝<br/>区域：朝阳CBD<br/>人气:189897',
		'用户3<br/>人气1',
		'用户4<br/>人气1',
		'用户5<br/>人气1',
		'用户6<br/>人气1',
		'用户7<br/>人气1',
		'用户8<br/>人气1',
		'用户9<br/>人气1',
		'用户10<br/>人气1',
		];
		
		$('.hot_area ul li').hover(function(){
			var oWidth = $(this).width()-12;
			var oHeight = $(this).height()-12;
			if($(this).index()==0){
				return;
			}
			$('.hot_area ul li p').remove();
			
			$(this).append('<p style="width:'+oWidth+'px;height:'+oHeight+'px;">'+arr[$(this).index()]+'</p>');
			
		},
		function(){
			$(this).find('p')
			
		});
		
	})();
	
})();
