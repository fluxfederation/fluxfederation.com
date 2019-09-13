$(document).ready(function () {

	talk_to_us_styles = {
		'#talk-to-us #input-2 p' : 'm-all t-1of3',
		'#talk-to-us #input-14' : 'news' ,
		'#talk-to-us textarea' : 'full-width'
	}

	drop_a_line_styles = {
		'.drop-us-a-line-container p' : 'm-all',
		'.drop-us-a-line-container p label' : 'm-all d-1of4',
		'.drop-us-a-line-container input, .drop-us-a-line-container textarea' : 'm-all t-3of4 cf',
		'.drop-us-a-line-container .flux-button-container' : 'm-all t-1of4 right cf'
	}

	if ($('#talk-to-us').length) {
		getFormData(1)
		.then(data => buildForm(data))
		.then(form => $('.talk-to-us-container').append(form))
		.then(() => addCustomCss(talk_to_us_styles))
		.catch(error => console.log(error))
	}

	if ($('.drop-us-a-line-container').length) {
		getFormData(2)
		.then(data => buildForm(data))
		.then(form => $('.drop-us-a-line-container').append(form))
		.then(() => addCustomCss(drop_a_line_styles))
		.catch(error => console.log(error))
	}

	addCustomCss = (styles) => {
		$.each(styles, (selector, classNames) => $(selector).addClass(classNames))
	}

	buildForm = data => {
		console.log(data)
	 	html = hiddenIdInput(data.id)
		$.each(data.fields, function (i,input) {
			html += createInput(input)
		})
		html += submitButton(data.button, data.id)
		return $(`<form id="${data.id}" enctype="text/plain"></form>`).append(html)
	}

	createInput = input => {
		switch(input.type) {
		case 'checkbox':
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
		case 'captcha':
		  return ''
		  break;
		}
	}

	radioInput = input => {
		html = `<div class="radio-buttons" id="input-${input.id}" >`
		$.each(input.choices, function (i,v) {
			html += `<p><input id="${v.value}" type="${input.type}" name="${input.id}${input.type == 'checkbox' ? `.${i+1}` : ""}" value="${v.value}" ${(v.isSelected ? " checked" : "" )}><label for="${v.value}">${v.text}</label></p>`
		})
		html += '</div>'
		return html
	}

	textInput = input => `<p id="input-${input.id}">${label(input)}<input name="${input.id}" type="${input.type}" placeholder="${input.placeholder}"></p>`
	
	textArea = input => `<p id="input-${input.id}">${label(input)}<textarea name="${input.id}" placeholder="${input.placeholder}"></textarea></p>`

	label = input => labelIsLeftAlign(input.cssClass) ? `<label for="${input.id}" class="m-all d-1of4">${input.label}</label>` : `<label for="${input.id}">${input.label}</label><br>`

	hiddenIdInput = id => `<input id="${id}" type="hidden" value="${id}" name="form_id"></input>`

	submitButton = (button, id) => `<div class="flux-button-container"><div class="flux-button" id="${id}"><a href="${id}">${button.text}</a></div></div>`

	labelIsLeftAlign = classes => classes.split(' ').indexOf('label-left-align') >= 0

	addEntry = form => {
		data = formDataToJson($(form).serializeArray())
		console.log(data)
		postForm(data)
		.then(data => console.log(data))
		.catch(error => console.log(error))
	}

	formDataToJson = data => {
		json = {}
		$(data).each((i, v) => json[v.name] = v.value)
		return json
	}

	$('body').on('click', 'form .flux-button', (e) => {
		id = e.currentTarget.id
		$(`form#${id}`).submit()
	})

	$('body').on('submit', 'form', e => {
		addEntry(e.currentTarget)
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
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/form/" + data.form_id,
				crossDomain: true,
				method: 'POST',
				dataType: "json",
				data: JSON.stringify(data),
				success: function(data) {
					resolve(data)
				},
				error: function(error) {
					reject(error)
				}
			})
		})
	}


})



