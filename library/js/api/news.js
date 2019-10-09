$(document).ready(function () {

	$('.events-page').length ? getEventsData().then((events) => addEventsToPage(events)) : ''
	$('.blog-page').length ? getBlogPosts().then((events) => addBlogsToPage(events)) : ''

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

	function getBlogPosts() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/posts",
				crossDomain: true,
				success: function(data) {
					resolve(data)
				},
				error: function(error) {
					console.log(error)
				}
			})
		})	
	}



	addEventsToPage = events => {
		html =`<section class="white"><article class="wrap cf">`
		$.each(events.reverse(), (i, event) => html += eventItem(event))
		html += `</section>`
		$('.events-page').append(html)
	}

	addBlogsToPage = blogs => {
		console.log(blogs)
	}

	eventItem = event => {
		html = 
			`<div class="table-layout">
				<div class="m-all t-4of12">
					<img src="${event.image_url}" style="object-fit: contain; max-height: 200px;">
				</div>
				<div class="m-all t-7of12 t-offset-left-1of12">
					<h2>${event.title}</h2>
					<h4>${event.dates}</h4>
					<p>${event.blurb}</p>
				</div>
			</div>`
		return html
	}

})