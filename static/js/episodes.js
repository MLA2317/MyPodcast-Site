/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Favs
5. Init SVG
6. Init Isotope
7. Init Single Player
8. Init Gallery


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var ctrl = new ScrollMagic.Controller();

	setHeader();
	initMenu();
	initFavs();
	initSvg();
	initIsotope();
	initSinglePlayer();
	initGallery();

	$(window).on('resize', function()
	{
		setHeader();

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		var header = $('.header');

		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			var hamburger = $('.hamburger');
			var close = $('.menu_close');

			hamburger.on('click', function()
			{
				menu.toggleClass('active');
			});

			close.on('click', function()
			{
				menu.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Favs

	*/

	function initFavs()
	{
		if($('.show_fav_icon').length)
		{
			var icons = $('.show_fav_icon');
			icons.each(function()
			{
				var icon = $(this);
				icon.on('click', function()
				{
					if(icon.hasClass('active'))
					{
						icon.removeClass('active');
					}
					else
					{
						icon.addClass('active');
					}
				});
			});
		}
	}

	/* 

	5. Init SVG

	*/

	function initSvg()
	{
		if($('img.svg').length)
		{
			jQuery('img.svg').each(function()
			{
				var $img = jQuery(this);
				var imgID = $img.attr('id');
				var imgClass = $img.attr('class');
				var imgURL = $img.attr('src');

				jQuery.get(imgURL, function(data)
				{
					// Get the SVG tag, ignore the rest
					var $svg = jQuery(data).find('svg');

					// Add replaced image's ID to the new SVG
					if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
					}
					// Add replaced image's classes to the new SVG
					if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
					}

					// Remove any invalid XML tags as per http://validator.w3.org
					$svg = $svg.removeAttr('xmlns:a');

					// Replace image with new SVG
					$img.replaceWith($svg);
				}, 'xml');
			});
		}	
	}

	/* 

	6. Init Isotope

	*/

    function initIsotope()
    {
    	if($('.episode').length)
    	{
    		var grid = $('.episodes_container').isotope({
	  			itemSelector: '.episode',
	  			percentPosition: true,
	  			masonry:
	  			{
				    horizontalOrder: true
			  	}
	        });

	        // Filtering
	        $('.item_filter_btn').on('click', function()
	        {
		        var filterValue = $(this).attr('data-filter');
				grid.isotope({ filter: filterValue });
	        });
    	}
    }

	/* 

	7. Init Single Player

	*/
	function initSinglePlayer(){

        if ($(".jp-jplayer").length)
            $.ajax({
                url: "http://127.0.0.1:8080/ids_list/",
                type: 'GET',
                success: function (res) {
                    for (let i in res['ids_list']) {
                        let ids_list = res['ids_list'];


                        for (i in ids_list) {
                            $(`#jplayer_${ids_list[i]}`).jPlayer({
                                ready: function () {
                                    let music_url = this.dataset['url']
                                    $(this).jPlayer("setMedia", {
                                        mp3: music_url
                                    });
                                },
                                play: function () { // To avoid multiple jPlayers playing together.
                                    $(this).jPlayer("pauseOthers");
                                },
                                swfPath: "plugins/jPlayer",
                                supplied: "mp3",
                                cssSelectorAncestor: `#jp_container_${ids_list[i]}`,
                                wmode: "window",
                                globalVolume: false,
                                useStateClassSkin: true,
                                autoBlur: false,
                                smoothPlayBar: true,
                                keyEnabled: true,
                                solution: 'html',
                                preload: 'metadata',
                                volume: 0.2,
                                muted: false,
                                backgroundColor: '#000000',
                                errorAlerts: false,
                                warningAlerts: false
                            });
                        }
                    }


                }
            })
        }
//	function initSinglePlayer()
//	{
//		if($(".jp-jplayer").length)
//		{
//			$("#jplayer_9").jPlayer({
//				ready: function () {
//				console.log(sing_url)
//				  let sing_url = this.dataset['url']
//
//					$(this).jPlayer("setMedia", {
//						title:"Better Days",
//							artist:"Bensound",
//							mp3: sing_url
//					});
//				},
//				play: function() { // To avoid multiple jPlayers playing together.
//					$(this).jPlayer("pauseOthers");
//				},
//				swfPath: "plugins/jPlayer",
//				supplied: "mp3",
//				cssSelectorAncestor: "#jp_container_9",
//				wmode: "window",
//				globalVolume: false,
//				useStateClassSkin: true,
//				autoBlur: false,
//				smoothPlayBar: true,
//				keyEnabled: true,
//				solution: 'html',
//				preload: 'metadata',
//				volume: 0.2,
//				muted: false,
//				backgroundColor: '#000000',
//				errorAlerts: false,
//				warningAlerts: false
//			});
//
//		}
//	}

	/*

	8. Init Gallery

	*/

	function initGallery()
	{
		if($('.gallery_item').length)
		{
			$('.colorbox').colorbox(
			{
				rel:'colorbox',
				photo: true,
				maxWidth:'95%',
				maxHeight:'95%'
			});
		}
	}

});


