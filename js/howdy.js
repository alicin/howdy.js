(function(jQuery){
	var count = 0;
	var timeouts = [];
	
	jQuery.extend({
		howdy: function(options){
			
			var defaults = {
				duration: 6000,
				message: '',
				position: {top: 50, right: 50},
				width: '600',
				type: '',
				onFirstNoticeCreate: function(){},
				onNoticeCreate: function(){},
				onNoticeDestroy: function(){},
				onAllNoticesDestroy: function(){}
			}
			
			var options = jQuery.extend({}, defaults, options);
			var wrapper = '<div class="flash_wrapper"></div>'
			var template = '<div class="flash_item_wrapper">'+
				'<div class="flash alert ' + 'alert-' + options.type + '">' +
					'<button type="button" class="close">close</button>' +
					'<div class="message">'+ options.message +'</div>' +
				'</div>'+
			'</div>'
			template = $(template);
			
			if( count === 0){
				$('body').append(wrapper);
				$('.flash_wrapper').css(options.position).width(options.width);
				
				if(typeof options.onFirstNoticeCreate === 'function'){
					options.onFirstNoticeCreate();
				}
			}
			
			if(options.position.top){
				$('.flash_wrapper').append(template);
			}else{
				$('.flash_wrapper').prepend(template);
			}
			
			if(typeof options.onNoticeCreate === 'function'){
				options.onNoticeCreate();
			}
			template.fadeIn(200);
			
			template.find('.close').on('click', function(){
				$.closeNotice(template, options);
			});
			
			count++;
			
			if(options.duration != Infinity){
				
				timeouts.push(setTimeout(function(){
					$.closeNotice(template, options);
				}, options.duration));
				
			}
			
			
		},
		closeNotice: function(obj, options){
			margin = obj.height() + 20;
			obj.animate({
				opacity: 0
			}, 200).animate({
				'margin-top': "-="+ margin +"px"
			}, 200,function(){
				obj.remove();
				if(typeof options.onNoticeDestroy === 'function'){
					options.onNoticeDestroy();
				}
				count--;

				if (count === 0){
					for(i=0; i<timeouts.length; i++){
						clearTimeout(timeouts[i]);
					}
					$('.flash_wrapper').remove();
					if(typeof options.onAllNoticesDestroy === 'function'){
						options.onAllNoticesDestroy();
					}
				}
			});
		}
	});
})(jQuery);