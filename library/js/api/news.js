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
		n = 0
		$.each(blogs.reverse(), (i, blog) => {
			n++
			n == 1 ? html += `<div class="space-top-double" style="display: inline-block; position: relative;">` : ''
			html += blogItem(blog)
			n == 3 ? html += `</div>` : ''
			n == 3 ? n = 0 : ''
		})
		html += `</section>`
		$('.blog-page').append(html)
	}


	eventItem = event => {
		html = 
			`<div class="table-layout">
				<div class="m-all t-4of12">
					<img src="${event.image_url}" style="object-fit: cover; max-height: 200px;">
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
		date_written = blog.date_written.split('/')
		date = new Date(parseInt(date_written[0]), parseInt(date_written[1]), parseInt(date_written[2]))
		day = date.getDate()
		month = date.toLocaleString('default', { month: 'short' })
		html = 
			`<div class="m-all t-4of12">
				<img src="${blog.banner_image}" style="object-fit: cover; max-height: 200px;">
				<h4>${blog.post_title}</h4>
				<div class="cf" style="margin-top: 20px; bottom: 0;">
					<image style="float: left; height: 44px; width: 44px; object-fit: cover; border-radius: 50%;" src="${blog.author_image}"">
					<strong><p style="float: left; margin: 0 10px;">${blog.author_name}</p></strong>
					<br>
					<p style="opacity: 0.7; float: left; margin: 0 10px;">${month} ${day} | ${blog.read_time} min read</p>
				</div>
			</div>`
		return html
	}




})