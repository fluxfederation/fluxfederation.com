$(document).ready(function () {

	$('.events-page').length ? getEventsData().then((events) => addEventsToPage(events)) : ''
	$('.blog-page').length ? getBlogPosts().then((blogs) => addBlogsToPage(blogs)) : ''
	$('.blog-post-page').length ? getSingleBlogPost().then((blog) => addBlogToPage(blog)) : ''

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


	function getSingleBlogPost() {
		const postId = () => new URL(document.location).searchParams.get('id')
		console.log('test')
		if(postId()) {
			return new Promise((resolve, reject) => {
				$.ajax({
					url: `https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/post/${postId()}`,
					crossDomain: true,
					success: function(data) {
						resolve(data)
					},
					error: function(error) {
						reject(error)
					}
				})
			})	
		} else {
			window.location.href = "../"
		}
	}


	addEventsToPage = events => {
		html =`<article class="wrap cf">`
		$.each(events.reverse(), (i, event) => html += eventItem(event))
		html += `</article>`
		$('.events-page').append(html)
	}

	addBlogToPage = blog => {
		console.log(blog)
	}

	addBlogsToPage = blogs => {
		html =`<article class="wrap cf">`
		n = 0
		$.each(blogs.reverse(), (i, blog) => {
			n++
			n == 1 ? html += `<div class="space-top-double" style="display: inline-block; position: relative;">` : ''
			html += blogItem(blog)
			n == 3 ? html += `</div>` : ''
			n == 3 ? n = 0 : ''
		})
		html += `</article>`
		$('.blog-page').append(html)
	}

	eventItem = event => {
		console.log(event)
		html = 
			`<div class="m-all t-1of4">
				<a style="text-decoration:none;" href="event/?id=${event.ID}">
					<img src="${event.image_url}" style="padding: 30px;object-fit: contain; height: 200px;">
					<h4>${event.title}</h4>
				</a>
				<div class="cf" style="margin-top: 20px; bottom: 0;">
					<strong><p style="float: left; margin: 0;">${event.dates}</p></strong>
					<br>
					<p style="opacity: 0.7; float: left; margin: 0;">${event.blurb}</p>
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
				<a style="text-decoration:none;" href="post?id=${blog.ID}">
					<img src="${blog.banner_image}" style="object-fit: cover; max-height: 200px;">
					<h4>${blog.post_title}</h4>
				</a>
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