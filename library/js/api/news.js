$(document).ready(function () {
	if ($('.events-page').length) {
		getEventsData()
		.then((data) => $.each(data.reverse(), (i, event) => $('.events-page').append(buildEventItem(event))))
	}

	function getEventsData() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/events",
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

	buildEventItem = event => {
		console.log(event)
		html = 
		`<section class="white">
			<article class="wrap cf">
				<div class="m-all t-1of2 d-8of12" style="height: 100%;"> 
					<div style="background-image: url(${event.image_url}); width: 100%; height: 100%; display: inline-block;"></div>
				</div>
				<div class="m-all t-1of2 d-4of12">
					<h2>${event.title}</h2>
					<h4>${event.dates}</h4>
					<p>${event.blurb}</p>
				</div>
			<article>
		</section>`
		return html
	}

})