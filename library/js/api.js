$(document).ready(function () {

	if ($('.drop-us-a-line-container').length) {
		dropLineForm()
	}

	// if ($('#talk-to-us')) {
	// 	console.log('test')
	// 	talkToUsForm()
	// }


	
	function dropLineForm() {
		$.ajax({
		  url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/form/2",
		  crossDomain: true
		}).done(function(data) {
			console.log(data)
			console.log(data.fields)
			html = '<form name="gform" id="get-in-touch-form">'
			$.each(data.fields, function (i,v) {
				html += '<p class="m-all">'
				html += '<label for="' + v.cssClass + '" class="m-all d-1of4">' + v.label + '</label>' 
				if (v.type == 'text' || v.type == 'email') {
					html += '<input id="'+ v.cssClass + '" type="' + v.type + '" placeholder="' + v.placeholder + '" class="m-all t-3of4 cf">'
				} else if (v.type == 'textarea') {
					html += '<textarea id="' + v.className + '" placeholder="' + v.placeholder + '" class="m-all t-3of4 cf"></textarea>'
				}
				html += '</p>'
			})
			html += '<div class="m-all t-1of4 right cf"><div class="flux-button"><a class="gform" href="get-in-touch-form">Go</a></div></div>'
			html += '</form>'
			$('.drop-us-a-line-container').html(html)
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