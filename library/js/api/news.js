$(document).ready(function () {

	$('.events-page').length ? getEventsData().then((events) => addEventsToPage(events)) : ''
	$('.blog-page').length ? getBlogPosts().then((blogs) => addBlogsToPage(blogs)) : ''

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
					reject(error)
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
		html =`<section class="white"><article class="wrap cf">`
		$.each(blogs.reverse(), (i, blog) => html += blogItem(blog))
		html += `</section>`
		$('.blog-page').append(html)
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

	blogItem = blog => {
		console.log(blog)
		html = 
			`<div class="m-all t-4of12" >
				<img src="https://www.newzealand.com/assets/Tourism-NZ/Auckland/d9db343eba/img-1536246368-4474-25053-p-5AFB273C-B866-CC92-5C84407C8052181E-2544003__FocalPointCropWzQyNyw2NDAsNDYsNTcsODUsImpwZyIsNjUsMi41XQ.jpg" style="object-fit: cover; max-height: 200px;">
				<h2>${blog.post_title}</h2>
			</div>`
		return html
	}




})