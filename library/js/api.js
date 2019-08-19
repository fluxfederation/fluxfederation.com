$(document).ready(function () {

	if ($('.drop-us-a-line-container')) {
		dropLineForm()
	}

	
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

})