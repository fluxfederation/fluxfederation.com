submitted_form_id = null

$(document).ready(function () {

	setupForms = () => {
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
		if ($('#brochure-download-form-container').length) {
			getFormData(3)
			.then(data => buildForm(data))
			.then(form => $('#brochure-download-form-container').append(form))
			.then(() => addCustomCss(brochure_download_styles))
			.catch(error => console.log(error))
		}
		if ($('#get-in-touch-form-2').length) {
			getFormData(5)
			.then(data => buildForm(data))
			.then(form => $('#get-in-touch-form-2').append(form))
			.then(() => addCustomCss(drop_a_line_styles))
			.catch(error => console.log(error))
		}
	}

	addCustomCss = (styles) => {
		$.each(styles, (selector, classNames) => $(selector).addClass(classNames))
	}

	buildForm = data => {
	 	html = hiddenIdInput(data.id)
	 	html += hiddenRedirectUrl(data)
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
			break
		case 'html':
			return input.content
			break
		case 'text':
			return textInput(input)
			break
		case 'email':
			return textInput(input)
			break
		case 'textarea':
		  return textArea(input)
		case 'captcha':
		  return ''
		  break
		}
	}

	pathFromUrl = url => new URL(url).pathname

	hiddenRedirectUrl = data => `<input id="redirect-url" type="hidden" value="${pathFromUrl(data.confirmations[Object.keys(data.confirmations)[0]].url)}"></input>`

	redirectAfterSuccess = url => window.location.href = url

	radioInput = input => {
		html = `<div class="radio-buttons" id="${input.cssClass}-container" >`
		$.each(input.choices, function (i,v) {
			html += `<p><input id="${v.value}" type="${input.type}" name="${input.id}${input.type == 'checkbox' ? `.${i+1}` : ""}" value="${v.value}" ${(v.isSelected ? " checked" : "" )}><label for="${v.value}">${v.text}</label></p>`
		})
		html += '</div>'
		return html
	}

	textInput = input => `<p id="${input.cssClass}-container">${label(input)}<input id="${input.cssClass}" name="${input.id}" type="${input.type}" placeholder="${input.placeholder}"></p>`
	
	textArea = input => `<p id="${input.cssClass}-container">${label(input)}<textarea id="${input.cssClass}" name="${input.id}" placeholder="${input.placeholder}"></textarea></p>`

	label = input => `<label for="${input.cssClass}">${input.label}</label>`

	hiddenIdInput = id => `<input id="${id}" type="hidden" value="${id}" name="form_id"></input>`

	submitButton = (button, id) => `<div class="flux-button-container"><div class="flux-button" id="${id}"><button>${button.text}</button></div></div>`

	processEntry = (form, captcha_response = null) => {
		data = formDataToJson($(form).serializeArray())
		captcha_response ? data = { ...data, captcha_response: captcha_response } : ''
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
		e.preventDefault()
		id = e.currentTarget.id
		form = $(`form#${id}`)
		submitted_form_id = id
		allFieldsValid(id) ? grecaptcha.execute() : ''
	})

	$('body').on('submit', 'form', e => {
		e.preventDefault()
		form = e.currentTarget
		captcha_response ? processEntry(form, captcha_response) : processEntry(form)
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
		form_id = data.form_id
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/form/" + form_id,
				crossDomain: true,
				method: 'POST',
				dataType: "json",
				data: JSON.stringify(data),
				success: function(data) {
					redirect_url = $(`form#${form_id}`).find('#redirect-url').val()
					redirectAfterSuccess(redirect_url)
					resolve(data)
				},
				error: function(error) {
					reject(error)
				}
			})
		})
	}

	talk_to_us_styles = {
		'#talk-to-us #help-type-radio-container p' : 'm-all t-1of3',
		'#talk-to-us #email-checkbox-container' : 'news' ,
		'#talk-to-us #question-textarea' : 'full-width'
	}

	drop_a_line_styles = {
		'.drop-us-a-line-container p' : 'm-all',
		'.drop-us-a-line-container p label' : 'm-all d-1of4',
		'.drop-us-a-line-container input, .drop-us-a-line-container textarea' : 'm-all t-3of4 cf',
		'.drop-us-a-line-container .flux-button-container' : 'm-all t-1of4 right cf'
	}

	brochure_download_styles = {
		'#brochure-download-form-container #help-type-radio-container p' : 'm-all t-1of3',
		'#brochure-download-form-container #email-checkbox-container' : 'news',
		'#brochure-download-form-container #question-textarea' : 'full-width'
	}

})



