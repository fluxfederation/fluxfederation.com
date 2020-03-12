$(document).ready(function () {

	localStorage.getItem("cookies-ok") != 'true' ? $('.cookie-disclaimer').show() : ''

	setCookiesClose = () => {
		localStorage.setItem("cookies-ok", 'true')
	}

	$('body').on('click', '.cookie-disclaimer-close', () => {
		setCookiesClose()
		$('.cookie-disclaimer').hide()
	})

})



