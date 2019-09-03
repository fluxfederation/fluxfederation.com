$(document).ready(function () {

	if ($('.drop-us-a-line-container').length) {
		dropLineForm()
	}

	if ($('#talk-to-us').length) {
		talkToUsForm()
	}

	function dropLineForm() {
		$.ajax({
		  url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/form/2",
		  crossDomain: true
		}).done(function(data) {
			html = '<form name="gform" id="get-in-touch-form">'
			html += createTextInputs(data.fields)
			html += '<div class="m-all t-1of4 right cf"><div class="flux-button"><a class="gform" href="get-in-touch-form">Go</a></div></div>'
			html += '</form>'
			$('.drop-us-a-line-container').html(html)
		})
	}

	function talkToUsForm() {
		$.ajax({
		  url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/form/1",
		  crossDomain: true
		}).done(function(data) {
		 	console.log(data)
		 	console.log(data.fields)
		 	$('.form-title').text(data.fields[0].label)
		 	html = '<form name="gform" enctype="text/plain">'
		 	html += '<div class="radio-buttons">'
		 		$.each(data.fields[0].choices, function (i,v) {
		 			console.log(v.isSelected)
		 			html += '<p class="m-all t-1of3"><input id="' + v.value + '" type="radio" value="' + v.text + '"' + (v.isSelected ? 'checked' : '' ) + '><label for="' + v.value + '">' + v.text + '</label></p>'
		 		})
	 		html += '</div>'
	 		html += createTextInputs(data.fields)
		 	$('.talk-to-us-container').html(html)
		})
	}

	function createTextInputs(fields) {
		html = ''
		$.each(fields, function (i,v) {
			if (['text', 'email', 'textarea'].indexOf(v.type) >= 0) {
				html += '<p class="m-all">'
				html += '<label for="' + v.cssClass + '" class="m-all d-1of4">' + v.label + '</label>' 
				if (v.type == 'text' || v.type == 'email') {
					html += '<input id="'+ v.cssClass + '" type="' + v.type + '" placeholder="' + v.placeholder + '" class="m-all t-3of4 cf">'
				} else if (v.type == 'textarea') {
					html += '<textarea id="' + v.className + '" placeholder="' + v.placeholder + '" class="m-all t-3of4 cf"></textarea>'
				}
				html += '</p>'
			}
		})
		return html
	}

})









