class Form {

	constructor(id, styles_id, name) {
		self = this
		this.id = id
		this.styles = this.getStyles(styles_id)
		this.name = name
		this.getFormData(id)
		.then(data => self.buildForm(data))
		.then(form => $(name).append(form))
		.then(() => self.addCustomCss(this.styles))
		.catch(error => console.log(error))
	}

	getFormData(form_id) {
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

	buildForm(data) {
	 	let html = self.hiddenIdInput(data.id)
	 	html += self.hiddenRedirectUrl(data)
		$.each(data.fields, function (i,input) {
			html += self.createInput(input)
		})
		html += self.submitButton(data.button, data.id)
		return $(`<form id="${data.id}" enctype="text/plain"></form>`).append(html)
	}

	addCustomCss(styles) {
		$.each(styles, (selector, classNames) => $(selector).addClass(classNames))
	}

	createInput(input) {
		switch(input.type) {
		case 'checkbox':
		case 'radio':
			return self.radioInput(input)
			break
		case 'html':
			return self.input.content
			break
		case 'text':
			return self.textInput(input)
			break
		case 'email':
			return self.textInput(input)
			break
		case 'textarea':
		  return self.textArea(input)
		case 'captcha':
		  return ''
		  break
		}
	}

	hiddenRedirectUrl(data) {
		return `<input id="redirect-url" type="hidden" value="/thank-you/?thank=get-in-touch"></input>`
	}

	radioInput(input) {
		html = `<div class="radio-buttons" id="${input.cssClass}-container" >`
		$.each(input.choices, function (i,v) {
			html += `<p><input id="${v.value}" type="${input.type}" name="${input.id}${input.type == 'checkbox' ? `.${i+1}` : ""}" value="${v.value}" ${(v.isSelected ? " checked" : "" )}><label for="${v.value}">${v.text}</label></p>`
		})
		html += '</div>'
		return html
	}

	textInput(input) {
		return `<p id="${input.cssClass}-container">${self.label(input)}<input id="${input.cssClass}" name="${input.id}" type="${input.type}" placeholder="${input.placeholder}"></p>`
	}
	
	textArea(input) {
		return `<p id="${input.cssClass}-container">${self.label(input)}<textarea id="${input.cssClass}" name="${input.id}" placeholder="${input.placeholder}"></textarea></p>`
	}

	label(input) {
		return `<label for="${input.cssClass}">${input.label}</label>`
	}

	hiddenIdInput(id) {
		return `<input id="${id}" type="hidden" value="${id}" name="form_id"></input>`
	} 

	submitButton(button, id) {
		return `<div class="flux-button-container"><div class="flux-button" id="${id}"><button>${button.text}</button></div></div>`
	} 

	getStyles(id) {
		switch(id) {
		case 1:
			return self.talk_to_us_styles
			break
		case 2:
		  return self.drop_a_line_styles
		case 3:
		  return self.brochure_styles
		  break
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

	brochure_styles = {
		'#brochure-download-form-container #help-type-radio-container p' : 'm-all t-1of3',
		'#brochure-download-form-container #email-checkbox-container' : 'news',
		'#brochure-download-form-container #question-textarea' : 'full-width'
	}

}