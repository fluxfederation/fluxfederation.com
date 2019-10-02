class Captcha {
	constructor() {
	 	this.sitekey = '6Ld5v7cUAAAAANz28l09GqtI4KjKOuJcrwjn1HUD'
	 	this.response = null
	 	self = this
	}

	appendCaptchaWatcher() {
		$('body').append(`<div id="recaptcha" data-size="invisible"></div>`)	
	} 

	initCaptcha() {
		grecaptcha.render(`recaptcha`, { 
		  sitekey: this.sitekey,
		  callback: function() {
		  	$(`form#${submitted_form_id}`).submit()
		  }
		})
	}

	toggleCaptchaBadgeDisplay() {
		if (!$('#talk-to-us').length && !$('#brochure-download-form-container').length) {
			var display = $('.grecaptcha-badge').css('display')
			display == 'block' ? display = 'none' : display = 'block'
			$('.grecaptcha-badge').css({'display': display})
		}
	}
}