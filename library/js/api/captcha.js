captcha_sitekey = '6LcAZbsUAAAAAGfUVO4VBM5DVEkPySuVX186Kg72'
submitted_form_id = null
captcha_response = null

captchaLoaded = () => {
	$(document).ready(function () {
		captchaAndDocumentLoaded()
	})
}

$(document).ready(function () {

	captchaAndDocumentLoaded = () => {
		appendCaptchaWatcher()
		initCaptcha()
		toggleCaptchaBadgeDisplay()
		setupForms()
	}

	shouldIncludeCaptcha = fields => {
		for (var field of fields) {
		  if (field.type == 'captcha') { 
		  	return true
		  }
		}
	}

	appendCaptchaWatcher = () => $('body').append(`<div id="recaptcha" data-size="invisible"></div>`)

	initCaptcha = () => {
		grecaptcha.render(`recaptcha`, { 
		  sitekey: captcha_sitekey,
		  callback: function(response) {
		  	captcha_response = response
		  	$(`form#${submitted_form_id}`).submit()
		  }
		})
	}

	toggleCaptchaBadgeDisplay = () => {
		if (!$('#talk-to-us').length && !$('#brochure-download-form-container').length) {
			display = $('.grecaptcha-badge').css('display')
			display == 'block' ? display = 'none' : display = 'block'
			$('.grecaptcha-badge').css({'display': display})
		}
	}

	$('body').on('click', 'a.drop-us-a-line', () => {
		toggleCaptchaBadgeDisplay()
	})
	
})



