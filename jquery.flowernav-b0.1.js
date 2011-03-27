/*
 * flowernav jQuery plugin
 * version b0.1
 *
 * Copyright (c) 2011 Philipp Urlich (soma.urlich.ch)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt) 
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://soma.urlich.ch
 *
 */


(function($){
$.fn.flowernav = function( options ) { 

    var settings = {
      'radius'		: 120,
	  'drag'		: false
    };

    return this.each( function() {        
        // If options exist, lets merge them
        // with our default settings
        if ( options ) { 
            $.extend( settings, options );
        }

        var $this = $(this);
        var $button  = $this.find('.navbutton');
        
        var childcount = $this.find('ul li').size();
        var spacing = 360 / childcount;

        var ai;
        var ite = 0;
        var istoggle = false;
        
        $button.data('isopen', 0);
        $button.data('canopen', 1);
        $this.find('ul li').css({ opacity: 0});

        if(settings.drag){
			$this.draggable({
            	start: function(event, ui) {  $button.data('canopen', 0); }
        	});
		}


        $button.live('mouseup', function(e){
            s = $button.data('isopen');
            c = $button.data('canopen');
            if(s == 1 && c == 1){ $button.data('isopen', 0); close(); }
            if(s == 0 && c == 1){ $button.data('isopen', 1); open();}
            if(c == 0) $button.data('canopen',1);
        });

        var open = function() {
            clearInterval(ai);    
            istoggle = true;
            $this.find('ul li').show();
            var it = ite/3;
            $this.find('ul li').each(function(i) {
                nx = Math.floor(settings.radius * (Math.cos((i * spacing + it) / 57 )));
                ny = Math.floor(settings.radius * (Math.sin((i * spacing + it) / 57 )));
                $(this).stop().animate({
                    opacity: .5,
                    top: ny,
                    left: nx
                },400,"swing", function(){
                    if(i == childcount -1){
                        //ite = 0;
                        ai = setInterval(move_circle,20);
                        istoggle = false;
                    }
                
                    });
                
            });
            
        }

        function close() {
        
            istoggle = true;
            clearInterval(ai);
            
            $this.find('ul li').each(function(i) {

                $(this).stop().animate({
                    opacity: 0,
                    top: 0,
                    left: 0
                }, 500, function(){
                    istoggle = false;
                });
                
            });
           
        }

        $this.find('ul li').hover(
            function(){
                if(!istoggle){
                   $(this).siblings('li').css({zIndex:999});
                   $(this).css({zIndex:1000});
                    
                   $(this).stop().animate({
                       opacity:1
                    }, 500);
                    
                    clearInterval(ai);
                }
            },
            function(){
                if(!istoggle){
                    $(this).stop().animate({
                         opacity: .5
                     }, 500);
                
                    ai = setInterval(move_circle,20);
                }
                
         });


        function move_circle(){
            ite++;
            var it = ite/3;
            $this.find('ul li').each(function(i){
                nx = Math.floor(settings.radius * (Math.cos((i * spacing + it) / 57 )));
                ny = Math.floor(settings.radius * (Math.sin((i * spacing + it) / 57 )));
                $(this).css({top:ny,left:nx});
            });
            
        };
        
    });

};

})( jQuery );
