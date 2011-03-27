jQuery Flower Navigation Plugin

Version b0.1

Date Created: 29-03-2011 by Philipp Urlich

Dpepends on: jQuery 1.4 and jQuery UI javascript libraries

Description:

This plugin transforms an ul list into a craousel flower type navigation. There's several uses for this plugin. With CSS and additional JS functions  or events you can use this as a traditional navigation or as a picture galerie.

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