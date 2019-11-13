$(document).ready(function () {

	$('.case-studies-page').length ? getCaseStudiesData().then((case_study) => addCaseStudyToPage(case_study)) : ''

	function getCaseStudiesData() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://cms.fluxfederation.com/wp-json/fluxapi/v1/case-studies",
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

}