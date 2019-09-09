$(document).ready(function () {

	if ($('#talk-to-us').length) {
		getFormData(1)
		.then(data => buildForm(data))
		.then(form => $('.talk-to-us-container').append(form))
		.catch(error => console.log(error))
	}

	if ($('.drop-us-a-line-container').length) {
		getFormData(2)
		.then(data => buildForm(data))
		.then(form => $('.drop-us-a-line-container').append(form))
		.catch(error => console.log(error))
	}

	buildForm = data => {
	 	html = hiddenIdInput(data.id)
		$.each(data.fields, function (i,input) {
			html += createInput(input)
		})
		html += submitButton(data.button)
		return $('<form enctype="text/plain"></form>').append(html)
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
			html += `<p><input id="${v.value}" type="radio" name="${input.cssClass.split(' ')[0]}" value="${v.value}" ${(v.isSelected ? " checked" : "" )}><label for="${v.value}">${v.text}</label></p>`
		})
		html += '</div>'
		return html
	}

	textInput = input => `<p>${label(input)}<input name="${input.id}" type="${input.type}" placeholder="${input.placeholder}"></p>`
	
	textArea = input => `<p>${label(input)}<textarea name="${input.id}" placeholder="${input.placeholder}" style="width: 100%;"></textarea></p>`

	label = input => labelIsLeftAlign(input.cssClass) ? `<label for="${input.id}" class="m-all d-1of4">${input.label}</label>` : `<label for="${input.id}">${input.label}</label><br>`

	hiddenIdInput = id => `<input type="hidden" value="${id}" name="form_id"></input>`

	submitButton = button => `<div class="flux-button"><a>${button.text}</a></div>`


	addEntry = form => {
		form_data = $(form).serializeArray()
		var data = {};
		$(form_data ).each((i, v) => data[v.name] = v.value)
		postForm(data)
	}

	labelIsLeftAlign = classes => classes.split(' ').indexOf('label-left-align') >= 0

	$('.drop-us-a-line-container').on('click', '.drop-us-a-line-submit', () => $('.drop-us-a-line-container form').submit())

	$('.drop-us-a-line-container').on('submit', 'form', e => {
		addEntry(this)
		e.preventDefault()
	})

	function getFormData(form_id) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/form/" + form_id,
				crossDomain: true,
				success: function(data) {
					resolve(data)
				},
				error: function(error) {
					reject(error)
				}
			})
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



