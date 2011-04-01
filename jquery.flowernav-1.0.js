/**
 * flowernav jQuery plugin v1.0
 * 
 * Created: 29-03-2011 by Philipp Urlich (soma.urlich.ch)
 * Last updated: 01-04-2011
 * Changelog from b0.1:
 *	- various new options and callbacks.
 *	- easing for opening and closing animation
 *	- stuctural changes in the markup, nested ul while first level link is treated as the button
 *	- removed anchor button '.navbutton'.
 *
 * github.com/somatonic/jquery-flowernav/
 * 
 * Demo: http://jsfiddle.net/soma/fCEjk/embedded/result/
 *
 */


(function($){
$.fn.flowernav = function( options, callback ) { 

	var defaults = {
		'radius'			: 120,
		'direction'			: 'cw',
		'speed'				: 3,
		'rotate'			: true,
		'radiusX'			: 110,
		'radiusY'			: 110,
		'oSpeed'			: 500,
		'cSpeed'			: 400,
		'easingOpen'		: '', // jquery default swing
		'easingClose'		: '', // jquery default swing
		'hoverStop'			: true,
		'hoverOpacityIn'	: 1,
		'hoverOpacityOut'	: 0.5,
		'hoverSpeedIn'		: 600,
		'hoverSpeedOut'		: 600,
		'intv'				: 30,
		'offset'			: 0,
		'drag'				: false,
		'onOpenStart'		: function(){},
		'onOpenEnd'			: function(){},
		'onCloseStart'		: function(){},
		'onCloseEnd'		: function(){}
    };

	return this.each( function() {        
		// If options exist, lets merge them with our default settings
		if ( $.isFunction( options ) ) {
			callback = options;
			options = {};
		}
		var settings = $.extend({}, defaults, options);
		
		var $this = $(this);

		if ( callback ) { callback.call($this); }
		var $button  = $this.find('ul li a:first');
        
		var childcount = $this.find('ul ul li').size();
		var $childs = $this.find('ul ul li');
		var spacing = 360 / childcount;

		var ai;
		var ite = 0;
		var istoggle = false;
        
		$button.data('isopen', 0);
		$button.data('canopen', 1);
		$button.css({zIndex:1001});
		$this.find('ul ul li').css({ opacity: 0, position:'absolute', zIndex: 999, display:'block', margin:0, padding:0, top:0, left:0 });

		// makes the menu draggable
		if(settings.drag){
			if($.isFunction($().draggable)){
				$this.draggable({
					start: function(event, ui) {  $button.data('canopen', 0); }
				});
			}else{
				alert('Error: Missing jQuery UI Function "draggable" for dragging!');
			}
			
		}
		
		// prevent default link behaviour and 
		$button.live('click', function(e){e.preventDefault();});
		
		// handle the open/close tasks
		$button.live('mouseup', function(e){
			e.preventDefault();
			s = $button.data('isopen');
			c = $button.data('canopen');
			if(s === 1 && c === 1){ $button.data('isopen', 0); close(); }
			if(s === 0 && c === 1){ $button.data('isopen', 1); open();}
			if(c === 0) {$button.data('canopen',1);}
			
		});

		function open() {
			
			// callback
			settings.onOpenStart.call($this);
			
			clearInterval(ai);
			istoggle = true;
			$childs.show();
			
			var it = ite/settings.speed;
			
			$childs.each(function(i) {
				nx = Math.floor(settings.radiusX * (Math.cos((i * spacing + it + settings.offset) / 57 )));
				ny = Math.floor(settings.radiusY * (Math.sin((i * spacing + it + settings.offset) / 57 )));
				$(this).stop().animate({
 					opacity: settings.hoverOpacityOut,
					top: ny,
					left: nx
				},settings.oSpeed,settings.easingOpen, function(){
					if(i == childcount -1){
						if(settings.rotate){
							ai = setInterval(move_circle,settings.intv);
						}
						istoggle = false;
						// callback
						settings.onOpenEnd.call($this);
					}
				});
			});
		}

		function close() {
			
			// callback
        	settings.onCloseStart.call($this);
			
			istoggle = true;
			clearInterval(ai);
            
			$childs.each(function(i) {
				$(this).stop().animate({
					opacity: 0,
 					top: 0,
					left: 0
				}, settings.cSpeed,settings.easingClose, function(){
					istoggle = false;
					// callback
					if(i == childcount-1) {settings.onCloseEnd.call($this);}
				});
			});
		}

		$childs.hover(
			function(){
				if(!istoggle && $button.data('isopen') !== 0)
				{
					$(this).siblings('li').css({zIndex:999});
					$(this).css({zIndex:1000});
					
					$(this).stop().animate({
						opacity: settings.hoverOpacityIn
					}, settings.hoverSpeedIn);
					
					settings.hoverStop ? clearInterval(ai) : '' ;
				}
			},
			function(){
				if(!istoggle && $button.data('isopen') !== 0)
				{
					$(this).stop().animate({
						opacity: settings.hoverOpacityOut
					}, settings.hoverSpeedOut);
					
					if(settings.rotate){
						clearInterval(ai);
						settings.hoverStop ? ai = setInterval(move_circle,settings.intv) : '' ;
					}
				}
			}
		);

		function move_circle(){
			if(settings.direction == 'ccw'){
				ite--;
			}else{
				ite++;
			}
			
			var it = ite/settings.speed;

			$childs.each(function(i){
				nx = Math.floor(settings.radiusX * (Math.cos((i * spacing + it + settings.offset) / 57 )));
				ny = Math.floor(settings.radiusY * (Math.sin((i * spacing + it + settings.offset) / 57 )));
				$(this).css({top:ny,left:nx});
            });
        }
    });
};

})( jQuery );