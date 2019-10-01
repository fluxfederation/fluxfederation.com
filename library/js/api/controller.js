$(document).ready(function () {

	captcha = new Captcha()
	forms = {}
	
	captchaLoaded = () => {
		captcha.appendCaptchaWatcher()
		captcha.initCaptcha()
		captcha.toggleCaptchaBadgeDisplay()
		initForms()
	}

	initForms = () => {
		$('#talk-to-us').length ? forms.talkToUs = new Form(1, 1, '#talk-to-us') : ''
		$('.drop-us-a-line-container').length ? forms.dropLine = new Form(2, 2, '.drop-us-a-line-container') : ''
		$('#brochure-download-form-container').length ? forms.brochureDownload = new Form(3, 3, '#brochure-download-form-container') : ''
		$('#get-in-touch-form-2').length ? forms.brochureDownload = new Form(5, 1, '#get-in-touch-form-2') : ''
	}


})