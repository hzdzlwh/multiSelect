(function($){

	var MultiSelect = function(ele,opt){
		this.$element = ele;
		this.defaults = {
			width: '150',
			maxheight: '180',
			data: ['item1','item2','item3','item4','item5','item6'],
			selectallTxt: 'All',
			selectokTxt: 'ok'
		}
		this.options = $.extend({},this.defaults,opt);
	};

	MultiSelect.prototype = {
		select : function(){
			var that = this;
			this.$element.each(function(){

				var $this = $(this);   // $this -> jquery 选取的DOM元素
				var $ipt = $('<input type="text" readonly value="" class="select_rel" />');
				$ipt.width(that.options.width - 8);
				$this.width(that.options.width);
				$ipt.appendTo($this);

				//创建 下拉选项 
				//1.下拉选项包裹
				var $container = $('<div class="container"></div>');

				//2.创建 全选和确认按钮  top层
				var $top = $('<div class="top"></div>');//外层div包裹 
				var $all = $('<input type="checkbox" class="select_all"/><label>'+that.options.selectallTxt+'</label>');//全选
				var $btn = $('<button class="ok">'+that.options.selectokTxt+'</button>');
				$all.appendTo($top);
				$btn.appendTo($top);

				//3.下拉中的内容 content层
				var $content = $('<div class="content"></div>');//外层div包裹
				var count = that.options.data.length;
				var h = ( (count * 22) > parseInt(that.options.maxheight) ) ? that.options.maxheight : "'" + count * 22 + "'";
				$content.height(h);

				for(var i = count-1; i >= 0; i--){
			   		var $list = $('<div><input type="checkbox" value='+that.options.data[i]+' /><label>'+that.options.data[i]+'</label><br></div>');
			   		$list.appendTo($content);
				}

				//4把top层和content层加到$container下
				$top.appendTo($container);
            	$content.appendTo($container);

            	//把$container加到$this下
            	$container.appendTo($this);

            	var $dropList = $content.children().children('input');

            	$all.change(function (){//点击all
				
					  var opt_arr = [];
					  $dropList.each(function (){
						  if($all.is(':checked')){
							  $(this)[0].checked = 'checked';
							  opt_arr.push($(this).val());
						  }else{
							  $(this)[0].checked = '';
							  opt_arr=[];
						  }
					  }); 
					  
					  $ipt.val(opt_arr.join(';')); 	  
				});

				$container.addClass('hidden');//开始隐藏

				$ipt.focus(function (){//文本框处于编辑
					$container.removeClass('hidden');
					$this.addClass('multi_select_focus');
				});

				$btn.click(function (){//点击 ok按钮 
				    $container.addClass('hidden');
					$this.removeClass('multi_select_focus');
				});

				$dropList.change(function (){//勾选选项
					 var opt_arr = [];
					 $dropList.each(function (){
					   if ($(this).is(':checked'))  opt_arr.push($(this).val());
					   
					 });
					 var $dropList_selected = $content.children().children('input:checked');
					 $ipt.val(opt_arr.join(';'));
					 var o = $all[0];   //全选的checkbox框
					 var n1 = $dropList_selected.length;
					 var n2 = $dropList.length;
					 o.checked = (n1 === n2) ? 'checked' : '';
				});

			});
		}
	}

	// $.fn.MSDL = function(options){
	// 	var multiSelect = new MultiSelect(this,options);
	// 	return multiSelect.select();
	// }
	/*
		下面jquery扩展插件的写法和上面是等效的，如果不需要支持链式操作，也可以不写return

	*/
	$.fn.extend({
		MSDL : function(options){
			var multiSelect = new MultiSelect(this,options);
			return multiSelect.select();
		}
	});
})(jQuery)