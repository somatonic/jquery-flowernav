jQuery Flower Navigation Plugin v1.0

Last updated: 16-05-2012 by Philipp Urlich

Depends on: jQuery 1.3+, jQuery UI javascript library for if dragging set to true and easing

Demo: 
http://jsfiddle.net/soma/fCEjk/embedded/result/

Description:

This plugin transforms a simple <ul> list into a carousel flower bubble type navigation. There can be several uses for this plugin. With the right CSS, additional JS functions or events you could use this as a fancy bubble navigation menu, or as a simple picture galerie navigation if you combine it with any avaiable Lightbox/Fancybox... plugin.

This full version release has various more new options and also callbacks. You can also set the easing for the opening and closing animation. For more infos look at the example below, and have a look at the demo page.


The HTML Markup:

<nav id="flash">
<ul>
	<!-- link used as button by default .btn -->
	<li><a href="#flash" class="btn my_button">Flash</a>
		<!-- second level link will be used as childs -->
		<ul>
			<li><a href="#"><img src="http://soma.urlich.ch/_media/internet/mdm_th_1.jpg"/></a></li>
			<li><a href="#"><img src="http://soma.urlich.ch/_media/internet/rentahost_th_1.jpg"/></a></li>
			<li><a href="#"><img src="http://soma.urlich.ch/_media/internet/spinoff_th_1.jpg"/></a></li>
			<li><a href="#"><img src="http://soma.urlich.ch/_media/internet/goatrance_th_1.jpg"/></a></li>
			<li><a href="#"><img src="http://soma.urlich.ch/_media/internet/sgc_th_1.jpg"/></a></li>
			<li><a href="#"><img src="http://soma.urlich.ch/_media/internet/avaloq_th_1.jpg"/></a></li>
			<li><a href="#"><img src="http://soma.urlich.ch/_media/internet/pkcity_th_1.jpg"/></a></li>
			<li><a href="#"><img src="http://soma.urlich.ch/_media/internet/prounix_th_1.jpg"/></a></li>
		</ul>
	</li>
</ul>
</nav>

Applying the plugin:

<script>

	// no option initialisation, with dragging off and default settings (clockwise rotation)
	$('#nav').flowernav();
	
	// dragging enabled -> requires the "draggable" function of the jQuery UI Plugin / see jqueryui.com
	$('#nav').flowernav({drag:true});
	
	// initial callback function possible after plugin is invoked
	$('#nav').flowernav( {}, function(){ $('#log').append('"#'+this.id+'" flowernav inititated<br/>');} );

	// all of the default settings
	$('#flash').flowernav({
		radiusX			: 140, 		// radius of x axis in px, default: 110
		radiusY			: 110,		// radius of y axis in px, default: 110
		rotate			: true, 	// rotate items in a circle, default: true
		direction		: 'ccw', 	// counter clockwise rotation, default: clockwise
		speed			: 4, 		// speed inverse proportional 1 = fastest, default: 3
		oSpeed			: 1000, 		// speed of opening animation in ms, default: 500
		cSpeed			: 400,		// speed of closing animation in ms, default: 400
		easingOpen		: 'easeOutBounce', // override default easing of opening animation, default '' (jquery internal default) others via jquery ui or easing plugin,
		easingClose		: 'easeInBack', // override default easing of opening animation, default '' (jquery internal default) others via jquery ui or easing plugin,
		hoverStop		: true, 	// does stop the animation on item hover, default: true
		hoverOpacityIn	: 1,		// hover opacity of li's, default: 1
		hoverOpacityOut	: .4,		// opacity of li's , default: .5
		hoverSpeedIn	: 100,		// speed of hover toggle opacity animation in ms, default: 600
		hoverSpeedOut	: 700,		// speed of hover-out toggle opacity animation in ms, default: 600
		intv			: 20, 		// rotation interval time in ms, default: 10
		offset			: 45, 		// offset in circle in degrees, default: 0
		drag 			: true, 	// requires jquery ui plugin to function, default: false
		// callbacks
		btnClass		: '.btn',
		onOpenStart	: function(){ $('#log').append('"#'+this.attr('id')+' onOpenStart<br/>'); }, // at start of opening animation
		onOpenEnd	: function(){ $('#log').append('"#'+this.attr('id')+' onOpenEnd<br/>'); }, // at end of opening animation
		onCloseStart: function(){ $('#log').append('"#'+this.attr('id')+' onCloseStart<br/>'); }, // at start of closing animation
		onCloseEnd	: function(){ $('#log').append('"#'+this.attr('id')+' onCloseEnd<br/>'); } // at end of closing animation
	});


</script>