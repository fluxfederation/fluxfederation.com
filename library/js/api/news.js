$(document).ready(function () {

	$('.events-page').length ? getEventsData().then((events) => addEventsToPage(events)) : ''
	$('.blog-page').length ? getBlogPosts().then((blogs) => addBlogsToPage(blogs)) : ''
	$('.single-blog-page').length ? getSingleBlogPost().then((blog) => addBlogToPage(blog)) : ''

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
		$('.js-blog-title').text(blog.post_title)
		$('.banner-image').attr('src', blog.banner_image)
	}

	addBlogsToPage = blogs => {
		html =`<article class="wrap cf">`
		n = 0
		$.each(blogs.reverse(), (i, blog) => {
			n++
			n == 1 ? html += `<div class="news-items-row">` : ''
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
			`<div class="m-all t-1of4 news-item">
				<a href="event/?id=${event.ID}">
					<img src="${event.image_url}" class="item-image item-image-logo">
					<h4>${event.title}</h4>
				</a>
				<div class="cf item-info">
					<strong><p>${event.dates}</p></strong>
					<br>
					<p class="item-meta-info">${event.blurb}</p>
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
			`<div class="m-all t-4of12 news-item">
				<a href="post?id=${blog.ID}">
					<img src="${blog.banner_image}" class="item-image">
					<h4>${blog.post_title.substring(0,25)}..</h4>
				</a>
				<div class="cf item-info">
					<image class="item-author-image" src="${blog.author_image}"">
					<strong><p class="item-info-text-margin">${blog.author_name}</p></strong>
					<br>
					<p class="item-meta-info item-info-text-margin">${month} ${day} | ${blog.read_time} min read</p>
				</div>
			</div>`
		return html
	}





})