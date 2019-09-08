$(document).ready(function () {

	if ($('.drop-us-a-line-container').length) {
		getForm(2)
	}

	if ($('#talk-to-us').length) {
		getForm(1)
	}

	parseTalkToUsForm = data => {
		console.log(data)
	 	$('.form-title').text(data.fields[0].label)
	 	html = '<form name="gform" enctype="text/plain">'
	 	html += '<input type="hidden" value="' + data.id + '" name="form_id"></input>'
		$.each(data.fields, function (i,input) {
			html += createInput(input)
		})
	 	$('.talk-to-us-container').html(html)
	}

	createInput = input => {
		switch(input.type) {
		case 'radio':
			return radioInput(input)
			break;
		case 'html':
			return input.content
			break;
		case 'text':
			return textInput(input)
			break;
		case 'email':
			return textInput(input)
			break;
		case 'textarea':
		  return textArea(input)
		  break;
		}
	}

	radioInput = input => {
		html = '<div class="radio-buttons">'
		$.each(input.choices, function (i,v) {
			html += `<p class="m-all t-1of3"><input id="${v.value}" type="radio" value="${v.text}"${(v.isSelected ? " checked" : "" )}><label for="${v.value}">${v.text}</label></p>`
		})
		html += '</div>'
		return html
	}

	textInput = input => `<p>${label(input)}<input name="${input.id}" type="${input.type}" placeholder="${input.placeholder}"></p>`
	
	textArea = input => `<p>${label(input)}<textarea name="${input.id}" placeholder="${input.placeholder}" style="width: 100%;"></textarea></p>`

	label = input => labelIsLeftAlign(input.cssClass) ? `<label for="${input.id}" class="m-all d-1of4">${input.label}</label>` : `<label for="${input.id}">${input.label}</label><br>`

	parseDropLineForm = data => {
		html = '<form name="gform">'
		html += '<input type="hidden" value="' + data.id + '" name="form_id"></input>'
		html += createTextInputs(data.fields)
		html += '<div class="m-all t-1of4 right cf drop-us-a-line-submit"><div class="flux-button"><a>Go</a></div></div>'
		html += '</form>'
		$('.drop-us-a-line-container').html(html)
	}

	$('.drop-us-a-line-container').on('click', '.drop-us-a-line-submit', function (e) {
		$('.drop-us-a-line-container form').submit()
	})

	$('.drop-us-a-line-container').on('submit', 'form', function (e) {
		addEntry(this)
		e.preventDefault()
	})

	addEntry = form => {
		form_data = $(form).serializeArray()
		var data = {};
		$(form_data ).each((i, v) => data[v.name] = v.value)
		postForm(data)
	}

	labelIsLeftAlign = classes => classes.split(' ').indexOf('label-left-align') >= 0

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

	function postForm(data) {
		console.log(data)
		$.ajax({
		  url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/form/" + data.form_id,
		  crossDomain: true,
		  method: 'POST',
		  dataType: "json",
		  data: JSON.stringify(data),
		}).done(function(repsonse) {
			console.log(repsonse)
		})
	}


})



