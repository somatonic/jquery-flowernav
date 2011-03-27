jQuery Flower Navigation Plugin

Version b0.1

Date Created: 29-03-2011 by Philipp Urlich

Dpepends on: jQuery 1.4 and jQuery UI javascript libraries

Demo:
http://jsfiddle.net/soma/fCEjk/embedded/result/

Description:

This plugin transforms an ul list into a carousel flower type navigation. There's several uses for this plugin. With CSS and additional JS functions  or events you can use this as a traditional navigation or as a picture galerie. Optionaly you can set the option "drag" to true to make the .navbutton draggable. This requires the jQuery UI plugin to work.

Note that this version is only a initial experimental setup, trying to accomplish such fancy navigation. There could be many improvements and additional features to this version. Feel free to add or change thing to experiment.

How to use:

<script>

	//basic initialisation
	$('#nav').flowernav();

	// different settings
	$('#nav').flowernav({
		'radius': 200,
		'drag': true, // requires jquery ui plugin
	});

</script>