$(document).ready(function () {

	const self = this

	$('.events-page').length ? getEventsData().then((events) => addEventsToPage(events)) : ''
	if ($('.blog-page').length) {
		getBlogPosts().then(blogs => {
			self.blogs = blogs
			addBlogsToPage()
		})
	}
	$('.single-blog-page').length ? getSingleBlogPost().then((blog) => addBlogToPage(blog)) : ''

	$(document).on('click', '.show-more-blogs .flux-button', e => addBlogsToPage())

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

	function getBlogPosts(page_n = 'init') {
		url = `https://fluxfederation.wpengine.com/wp-json/fluxapi/v1/posts`
		return new Promise((resolve, reject) => {
			$.ajax({
				url: url,
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

	blogPostMeta = blog => {
		date_written = blog.date_written.split('/')
		date = new Date(parseInt(date_written[0]), parseInt(date_written[1]), parseInt(date_written[2]))
		day = date.getDate()
		month = date.toLocaleString('default', { month: 'short' })
		html = 
		`<div class="cf item-info">
			<image class="item-author-image" src="${blog.author_image}"">
			<strong><p class="item-info-text-margin">${blog.author_name}</p></strong>
			<br>
			<p class="item-meta-info item-info-text-margin">${month} ${day} | ${blog.read_time} min read</p>
		</div>`
		return html
	}

	returnToBlogLink = () => `<a href="../" class="back-to-blog-link m-all t-5of6"><p>< Back to Blog</p></a>`

	calcPageNum = () => $('.news-item').length % 6 != 0 ? 0 : $('.news-item').length ? $('.news-item').length / 6 : 1

	addBlogToPage = blog => {
		console.log(blog)
		blog.post_content == "" ? window.location.href = "../" : ''
		$('.blog-title').text(blog.post_title)
		$(blogPostMeta(blog)).insertAfter('.blog-title').addClass('m-all t-5of6').after($(returnToBlogLink()))
		$('.banner-image').attr('src', blog.banner_image)
		$('.banner-image-caption').text(blog.banner_image_caption)
		$('.blog-content article').html(blog.post_content).after(returnToBlogLink())
	}

	addBlogsToPage = (blogs) => {
		$('.show-more').remove()
		html = ``
		n = 0
		for (var i=0; i < 6; i++) {
			if (self.blogs.length) {
				n++
				console.log(self.blogs)
				blog = self.blogs[0]
				n == 1 ? html += `<div class="news-items-row">` : ''
				html += blogItem(blog)
				n == 3 || self.blogs.length == 1 ? html += `</div>` : ''
				n == 3 ? n = 0 : ''
				self.blogs.splice(0, 1)
			}
		}
		self.blogs.length ? html += `<div class="show-more show-more-blogs"><div class="flux-button"><a>Show More</a></div></div>` : ''
		$('.blog-section').append(html)
	}

	eventItem = event => {
		console.log(event)
		html = 
		`<div class="m-all t-4of12 news-item">
			<img src="${event.image_url}" class="item-image item-image-logo">
			<h4>${event.title}</h4>
			<div class="cf item-info">
				<strong><p>${event.dates}</p></strong>
				<br>
				<p class="item-meta-info">${event.blurb}</p>
			</div>
		</div>`
		return html
	}

	blogItem = blog => {
		// console.log(blog)
		html = 
		`<div class="m-all t-4of12 news-item">
			<a href="post?id=${blog.ID}">
				<img src="${blog.banner_image}" class="item-image">
				<h4>${blog.post_title.substring(0,25)}..</h4>
			</a>
			${blogPostMeta(blog)}
		</div>`
		return html
	}





})