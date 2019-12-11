$(document).ready(function () {

	$('.case-studies-page').length ? getCaseStudiesData().then(case_study => addCaseStudiesToPage(case_study)) : ''

	function getCaseStudiesData() {
		console.log('testt')
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://cms.fluxfederation.com/wp-json/fluxapi/v1/case-studies",
				crossDomain: true,
				success: data => resolve(data),
				error: error => reject(error)
			})
		})	
	}

	addCaseStudiesToPage = case_studies => {
		console.log(case_studies)
		html =`<article class="wrap cf">`
		$.each(case_studies.reverse(), (i, case_study) => html += caseStudyItem(case_study))
		html += `</article>`
		$('.case-studies-page').append(html)
	}

	caseStudyItem = case_study => {
		html = 
		`<div class="m-all t-4of12 news-item">
			<img src="" class="item-image item-image-logo">
			<h4>${event.title}</h4>
			<div class="cf item-info">
				<strong><p>${date.month} ${date.day}</p></strong>
				<strong><p><a target="_blank" href="http://www.google.com/maps/place/${event.location.lat},${event.location.lng}">${event.location.address.split(',')[0]}</a></p></strong>
				<br>
				<p class="preview">${event.description}</p>
			</div>
		</div>`
		return html
	}

})