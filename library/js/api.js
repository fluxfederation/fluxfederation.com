$(document).ready(function () {

	$('.drop-us-a-line-container') ? dropLineForm() : ''
	$('#talk-to-us') ? talkToUsForm() : ''


	
	function dropLineForm() {
		$.ajax({
		  url: "https://fluxfederation.wpengine.com/wp-json/wp/v2/pages/?slug=drop-us-a-line-form",
		  crossDomain: true
		}).done(function(data) {
		 	form = data[0].content.rendered
		 	console.log(form)
		 	$('.drop-us-a-line-container').html(form)
		})
	}

	function talkToUsForm() {
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