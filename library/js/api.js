$(document).ready(function () {

	captcha_sitekey = '6Ld5v7cUAAAAANz28l09GqtI4KjKOuJcrwjn1HUD'
	submitted_form_id = 0
	captcha_response = ''
	// captcha_loaded = false

	// waitForCaptcha()
	// .then(() => conditionFormRender())
	// .catch((error) => console.log(`Unable to load captcha : ${error}`))

	// function waitForCaptcha() {
	// 	return new Promise((resolve,reject) => {
	// 		setTimeout(() => { captcha_loaded ? resolve() : '' }, 150);
	// 	})
	// }

	captchaLoaded = () => {
		// captcha_loaded = true
		conditionFormRender()
	}

	conditionFormRender = () => {
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
			.then(form => initCaptcha())
			.then(() => addCustomCss(brochure_download_styles))
			.catch(error => console.log(error))
		}
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

	addCustomCss = (styles) => {
		$.each(styles, (selector, classNames) => $(selector).addClass(classNames))
	}

	buildForm = data => {
	 	html = hiddenIdInput(data.id)
	 	html += hiddenRedirectUrl(data)
	 	shouldIncludeCaptcha(data.fields) ? html += captchaDiv(data.id) : ''
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

	// hiddenRedirectUrl = data => `<div id="redirect-url" display="none" href="${data.confirmations[Object.keys(data.confirmations)[0]].url}"></div>`

	hiddenRedirectUrl = data => `<input id="redirect-url" type="hidden" value="/thank-you/?thank=get-in-touch"></input>`

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

	shouldIncludeCaptcha = fields => {
		for (var field of fields) {
		  if (field.type == 'captcha') { 
		  	return true
		  }
		}
	}

	captchaDiv = () => `<div id="recaptcha" data-size="invisible"></div>`

	initCaptcha = () => {
		grecaptcha.render(`recaptcha`, { 
		  sitekey: captcha_sitekey,
		  callback: function(response) {
		  	console.log(response)
		  	captcha_response = response
		  	$(`form#${submitted_form_id}`).submit()
		  }
		})
	}

	checkCaptcha = () => $(`#recaptcha`).length

	submitCaptcha = response => response

	processEntry = form => {
		data = formDataToJson($(form).serializeArray())
		console.log(captcha_response)
		// postForm(data)
		// .then(data => console.log(data))
		// .catch(error => console.log(error))
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
		console.log(checkCaptcha())
		console.log(allFieldsValid(id))
		if (checkCaptcha() && allFieldsValid(id)) {
			grecaptcha.execute()
		} else if (!checkCaptcha() && allFieldsValid(id)) {
			form.submit()
		}
	})

	$('body').on('submit', 'form', e => {
		e.preventDefault()
		form = e.currentTarget
		processEntry(form)
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
					console.log(redirect_url)
					redirectAfterSuccess(redirect_url)
					resolve(data)
				},
				error: function(error) {
					reject(error)
				}
			})
		})
	}

	////////////////////////////////////////////////////////////////////////
	// Validations //
	////////////////////////////////////////////////////////////////////////

	drop_a_line__validations = {
		'name-input' : ['aboveMinLength', 'belowMaxLength', 'noNumbers'],
		'email-input' : ['isEmail'],
		'help-textarea' : ['aboveMinLength']
	}

	talk_to_us_validations = {
		'name-input' : ['aboveMinLength', 'belowMaxLength', 'noNumbers'],
		'company-input' : ['aboveMinLength', 'belowMaxLength'],
		'role-input' : ['aboveMinLength', 'belowMaxLength'],
		'email-input' : ['isEmail'],
		'question-textarea' : ['aboveMinLength']
	}

	brochure_download_validations = {
		'name-input' : ['aboveMinLength', 'belowMaxLength', 'noNumbers'],
		'company-input' : ['aboveMinLength', 'belowMaxLength'],
		'role-input' : ['aboveMinLength', 'belowMaxLength'],
		'email-input' : ['isEmail']
	}

	getValidations = id => {
		switch(id) {
		case '1':
			return talk_to_us_validations
			break
		case '2':
			return drop_a_line__validations
			break
		case '3':
			return brochure_download_validations
			break
		}
	}

	runValidation = (val, validation) => {
		switch(validation) {
			case 'aboveMinLength':
				return aboveMinLength(val)
				break
			case 'belowMaxLength':
				return belowMaxLength(val)
				break;
			case 'isEmail':
				return isEmail(val)
				break
			case 'noNumbers':
				return noNumbers(val)
				break
		}
	}

	aboveMinLength = (val) => val.length >= 3

	belowMaxLength = (val) => val.length <= 30

	isEmail = val => /\S+@\S+\.\S+/.test(val)

	noNumbers = val => !/\d/.test(val)

	getFieldByID = (form_id, input_id) => $(`form#${form_id} *[id="${input_id}"]`)

	fieldIsValid = (val, validation) => runValidation(val, validation)

	getFieldValidation = (form_id, input_id) => getValidations(form_id)[input_id]

	addValidationClass = (input, valid) => valid ? input.removeClass('error').addClass('valid') : input.removeClass('valid').addClass('error')

	allFieldsValid = form_id => {
		valid = true
		validations = getValidations(form_id)
		for (var input_id in validations) {
			field_validations = validations[input_id]
			value = getFieldByID(form_id, input_id).val()
			$.each(field_validations, (i, validation) => {
				fieldIsValid(value, validation) ? '' : valid = false
			}) 
		}
		return valid
	}

	$('body').on('blur', 'input, textarea', (e) => {
		valid = true
		input_id = e.currentTarget.id
		form_id = e.currentTarget.form.id
		validations = getFieldValidation(form_id, input_id)
		value = getFieldByID(form_id, input_id).val()
		$.each(validations, (index, validation) => {
			// console.log(`${value} : ${validation} : ${runValidation(value, validation)}`)
			runValidation(value, validation) ? '' : valid = false
		})
		addValidationClass(getFieldByID(form_id, input_id), valid)
	})



})



