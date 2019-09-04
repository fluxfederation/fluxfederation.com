$(document).ready(function () {

	if ($('.drop-us-a-line-container').length) {
		getForm(2)
	}

	if ($('#talk-to-us').length) {
		getForm(1)
	}

	function parseTalkToUsForm(data) {
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
	}

	function parseDropLineForm(data) {
		html = '<form name="gform">'
		html += createTextInputs(data.fields)
		html += '<div class="m-all t-1of4 right cf drop-us-a-line-submit"><div class="flux-button"><a>Go</a></div></div>'
		html += '</form>'
		$('.drop-us-a-line-container').html(html)
	}

	function createTextInputs(fields) {
		html = ''
		$.each(fields, function (i,v) {
			if (['text', 'email', 'textarea'].indexOf(v.type) >= 0) {
				html += '<p class="m-all">'

				if (v.cssClass.split(' ').indexOf('label-left-align') >= 0) {
					html += '<label for="' + v.cssClass + '" class="m-all d-1of4">' + v.label + '</label>' 
				} else {
					html += '<label for="' + v.cssClass + '">' + v.label + '</label><br>' 
				}

				if (v.type == 'text' || v.type == 'email') {
					html += '<input name="'+ v.cssClass.split(' ')[0] + '" type="' + v.type + '" placeholder="' + v.placeholder + '" class="m-all t-3of4 cf">'
				} else if (v.type == 'textarea') {
					html += '<textarea name="' + v.cssClass.split(' ')[0] + '" placeholder="' + v.placeholder + '" class="m-all t-3of4 cf"></textarea>'
				}

				html += '</p>'
			}
		})
		return html
	}

	$('.drop-us-a-line-container').on('click', '.drop-us-a-line-submit', function (e) {
		$('.drop-us-a-line-container form').submit()
	})

	$('.drop-us-a-line-container').on('submit', 'form', function (e) {
		addEntry(this)
		e.preventDefault()
	})

	function addEntry(form) {
		form_data = $(form).serializeArray()
		var data = {};
		$(form_data ).each(function(i, v){
		    data[v.name] = v.value;
		});
		console.log(data)
	}

	////////////////////////////////////////////////////////////////////////
	//  API CALLS BELOW
	////////////////////////////////////////////////////////////////////////

	function getForm(form_id) {
		$.ajax({
		  url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/form/" + form_id,
		  crossDomain: true
		}).done(function(data) {
			switch(form_id) {
			  case 1:
				parseTalkToUsForm(data)
			    break;
			  case 2:
				parseDropLineForm(data)
			    break;
			}
		})
	}

	function postForm(form_id, data) {
		$.ajax({
		  url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/form/" + form_id,
		  crossDomain: true,
		  method: 'POST',
		  data: data
		}).done(function(repsonse) {
			console.log(repsonse)
		})
	}



})









