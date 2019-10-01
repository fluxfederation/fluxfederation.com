$(document).ready(function () {

	captcha = new Captcha()
	
	$('#talk-to-us').length ? talkToUsForm = new Form(1, )

	captchaLoaded = () => {
		captcha.appendCaptchaWatcher()
		captcha.initCaptcha()
		captcha.toggleCaptchaBadgeDisplay()
		initForms()
	}

	initForms = () => {

	}

})