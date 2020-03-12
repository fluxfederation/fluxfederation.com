$(document).ready(function () {

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
		case '5':
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

	getFieldValidation = (form_id, input_id) => getValidations(form_id)[input_id]

	addValidationClass = (input, valid) => valid ? input.removeClass('error').addClass('valid') : input.removeClass('valid').addClass('error')

	allFieldsValid = form_id => {
		valid = true
		validations = getValidations(form_id)
		for (var input_id in validations) {
			field_validations = validations[input_id]
			value = getFieldByID(form_id, input_id).val()
			$.each(field_validations, (i, validation) => {
				runValidation(value, validation) ? '' : valid = false
				addValidationClass(getFieldByID(form_id, input_id), valid)
			}) 
		}
		return valid
	}

	singleFieldValid = (form_id, input_id) => {
		valid = true
		validations = getFieldValidation(form_id, input_id)
		value = getFieldByID(form_id, input_id).val()
		$.each(validations, (index, validation) => {
			runValidation(value, validation) ? '' : valid = false
		})
		addValidationClass(getFieldByID(form_id, input_id), valid)
	}

	$('body').on('blur', 'input, textarea', (e) => {
		singleFieldValid(e.currentTarget.form.id, e.currentTarget.id)
	})



})



