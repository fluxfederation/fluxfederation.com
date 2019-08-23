$(document).ready(function () {

	if ($('.drop-us-a-line-container')) {
		dropLineForm()
	}

	if ($('#talk-to-us')) {
		console.log('test')
		talkToUsForm()
	}


	
	function dropLineForm() {
		$.ajax({
		  url: "https://fluxfederation.wpengine.com/wp-json/wp/v2/pages/?slug=drop-us-a-line-form",
		  crossDomain: true
		}).done(function(data) {
		 	form = data[0].content.rendered
		 	console.log(form)
		 	$('.drop-us-a-line-container').html(form)
		 	$('.drop-us-a-line-container form').addClass('m-all')
		 	$('.drop-us-a-line-container form label').addClass('d-1of4').css({'margin': '1em 0'})
		 	$('.drop-us-a-line-container form input:submit').remove()
		 	$('.drop-us-a-line-container form textarea').removeAttr('rows')
		 	$('.drop-us-a-line-container form').append('<div class="m-all t-1of4 right cf"><div class="flux-button"><a class="gform" href="get-in-touch-form">Go</a></div></div>')
		 	$('.drop-us-a-line-container form input:text, .drop-us-a-line-container form textarea').addClass('t-3of4').css({'margin': '1em 0'})
		})
	}

	function talkToUsForm() {
		console.log('test')
		$.ajax({
		  url: "https://fluxfederation.wpengine.com/wp-json/wp/v2/pages/?slug=lets-talk-form",
		  crossDomain: true
		}).done(function(data) {
		 	form = data[0].content.rendered
		 	console.log(form)
		 	// $('.drop-us-a-line-container').html(form)
		})
	}

})