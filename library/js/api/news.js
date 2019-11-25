$(document).ready(function () {

	const self = this

	$('.events-page').length ? getEventsData().then((events) => addEventsToPage(events)) : ''
	
	if ($('.blog-page').length) {	
		return	
		getBlogPosts().then(blogs => {
			self.blogs = blogs
			$('.skeleton-new-items').remove()
			addBlogsToPage()
		})
	}

	$('.single-blog-page').length ? getSingleBlogPost().then((blog) => addBlogToPage(blog)) : ''

	$('.social-share-container li').click(e => {
		current_url = window.location.href
		encoded_url = encodeURIComponent(current_url)
		test_encoded_url = encodeURIComponent('https://fluxfederation.com/')
		encoded_title = encodeURIComponent(document.title)
		facebook_url = `https://www.facebook.com/sharer/sharer.php?u=${encoded_url}&t=${encoded_title}`
		twitter_url = `http://twitter.com/share?text=${document.title}&url=${current_url}`
		linkedin_url = `https://www.linkedin.com/shareArticle?mini=true&url=${test_encoded_url}&title=${encoded_title}`
		switch(e.currentTarget.id) {
			case 'facebook':
				window.open(facebook_url, "pop", "width=600, height=400, scrollbars=no")
			break;
			case 'twitter':
				window.open(twitter_url, "pop", "width=600, height=400, scrollbars=no")
			break;
			case 'linkedin':
				window.open(linkedin_url, "pop", "width=600, height=400, scrollbars=no")
			break;
			case 'mail':
				$(`<a href="mailto:?Subject=${encoded_title}&Body=${encoded_url}"></a>`)[0].click()
			break;
		}
	})

	$(document).on('click', '.show-more-blogs .flux-button', e => addBlogsToPage())

	function getEventsData() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://cms.fluxfederation.com/wp-json/fluxapi/v1/events",
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
		url = `https://cms.fluxfederation.com/wp-json/fluxapi/v1/posts`
		return new Promise((resolve, reject) => {
			$.ajax({
				url: url,
				crossDomain: true,
				success: function(data) {
					setTimeout(() => resolve(data), 5000)
					// resolve(data)
				},
				error: function(error) {
					reject(error)
				}
			})
		})	
	}

	function getSingleBlogPost() {
		const postName = () => new URL(document.location).searchParams.get('name')
		if(postName()) {
			return new Promise((resolve, reject) => {
				$.ajax({
					url: `https://cms.fluxfederation.com/wp-json/fluxapi/v1/post/${postName()}`,
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

	parseBlogDate = date => {
		date = date.split('/')
		date = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]))
		day = date.getDate()
		month = date.toLocaleString('default', { month: 'short' })
		return {month: month, day: day}	
	}

	returnToBlogLink = () => `<a href="../" class="back-to-blog-link m-all t-5of6"><p>< Back to Blog</p></a>`

	calcPageNum = () => $('.news-item').length % 6 != 0 ? 0 : $('.news-item').length ? $('.news-item').length / 6 : 1

	addBlogToPage = blog => {
		blog.post_content == "" ? window.location.href = "../" : ''
		$('.blog-title').text(blog.post_title)
		$(blogPostMeta(blog)).insertAfter('.blog-title')
		$('.banner-image').attr('src', blog.banner_image)
		$('.banner-image-caption').text(blog.banner_image_caption)
		$('.blog-content article').html(blog.post_content)
		$('.fb-share-button').data('href', window.location.href)
		$.each(blog.tags, (i, tag) => {
			$('.tags-container').append(blogTag(tag.name))
		})
		$.each(blog.other_posts, (i, blog) => {
			$('.other-posts').append(otherBlogPreview(blog))
		})
		document.title = `${blog.post_title} - Flux Federation`
	}

	blogTag = tag => `<div class="tag">${tag}</div>`

	addBlogsToPage = () => {
		console.log(self.blogs)
		$('.show-more').remove()
		html = ``
		n = 0
		for (var i=0; i < 6; i++) {
			if (self.blogs.length) {
				n++
				blog = self.blogs[0]
				n == 1 ? html += `<div class="news-items-row">` : ''
				html += indexBlogPreview(blog)
				n == 3 || self.blogs.length == 1 ? html += `</div>` : ''
				n == 3 ? n = 0 : ''
				self.blogs.splice(0, 1)
			}
		}
		self.blogs.length ? html += showMorePostsButton() : ''
		$('.blog-section').append(html)
	}

	const showMorePostsButton = () => `<div class="show-more show-more-blogs"><div class="flux-button"><a>Show More</a></div></div>`

	eventItem = event => {
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

	blogPostMeta = blog => {
		console.log(blog)
		date = parseBlogDate(blog.date_written)
		html = 
		`<div class="cf item-info">
			<strong><p class="author">By ${blog.author_name}</p></strong>
			<br>
			<p class="item-meta-info">${date.month} ${date.day} | ${blog.read_time} min read</p>
		</div>`
		return html
	}

	const readMoreButton = name => `<div class="flux-button news-item-button"><a href="/newsroom/blog/post/?name=${name}">Read More</a></div>`

	indexBlogPreview = blog => {
		html = 
		`<div class="m-all t-4of12 news-item">
			<a href="post/?name=${blog.post_name}">
				<img src="${blog.banner_image}" class="item-image">
				<h4>${blog.post_title}</h4>
			</a>
			${blogPostMeta(blog)}
			<p class="preview">${blog.post_preview}</p>
			${readMoreButton(blog.post_name)}
		</div>`
		return html
	}

	otherBlogPreview = blog => {
		html = 
		`<div class="news-item">
			<a class="t-2of5" href="../post/?name=${blog.post_name}">
				<img src="${blog.banner_image}" class="item-image m-all">
			</a>
			<div class="t-3of5 m-all">
				<h4>${blog.post_title}</h4>
				${blogPostMeta(blog)}
				<p class="preview remove-all-padding">${blog.post_preview}</p>
				${readMoreButton(blog.post_name)}
			</div>
		</div>`
		return html
	}





})