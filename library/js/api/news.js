$(document).ready(function () {

	const self = this

	if ($('.events-page').length) {
		getEventsData().then((events) => {
			self.events = events
			$('.skeleton-event-items').remove()
			events.length ? addNewsToIndexPage(self.events, 'event', $('.events-section')) : $('.no-events-banner').fadeIn()
		})
	}

	if ($('.blog-page').length) {	
		getBlogPosts().then(blogs => {
			self.blogs = blogs
			$('.skeleton-new-items').remove()
			addNewsToIndexPage(self.blogs, 'blog', $('.blog-section'))
		})

		$(window).on('scroll', () => {
			if (isInViewport($('footer')) && self.blogs && self.blogs.length) {
				addNewsToIndexPage(self.blogs, 'blog', $('.blog-section'))
			}
		})

	}

	const isInViewport = element => {
		const element_top = element.offset().top
		const element_bottom = element_top + element.outerHeight()
		const viewport_top = $(window).scrollTop()
		const viewport_bottom = viewport_top + $(window).height()
		return element_bottom > viewport_top && element_top < viewport_bottom
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

	$(document).on('click', '.show-more-blogs .flux-button', () => addNewsToIndexPage(self.blogs, 'blog', $('.blog-section')))

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
					resolve(data)
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
			redirectBack()
		}
	}

	const redirectBack = () => window.location.href = "../"

	const addEventsToPage = events => {
		html =`<article class="wrap cf">`
		$.each(events.reverse(), (i, event) => html += eventItem(event))
		html += `</article>`
		$('.events-page').append(html)
	}

	const parseDateInfo = date => {
		date = date.split('/')
		date = new Date(parseInt(date[2]), (parseInt(date[1]) -1), parseInt(date[0]))
		day = date.getDate()
		weekday = date.toLocaleString('default', {weekday: 'long'})
		month_short = date.toLocaleString('default', { month: 'short' })
		month_long = date.toLocaleString('default', { month: 'long' })
		return {
			month_short: month_short,
			month_long: month_long,
		 	day: day,
		 	weekday: weekday
		}
	}

	const returnToBlogLink = () => `<a href="../" class="back-to-blog-link m-all t-5of6"><p>< Back to Blog</p></a>`

	const addBlogToPage = blog => {
		blog.post_content == "" ? redirectBack() : ''
		$('.blog-title').text(blog.post_title)
		$(blogPostMeta(blog)).insertAfter('.blog-title')
		$('.banner-image').attr('src', blog.banner_image)
		$('.banner-image-caption').text(blog.banner_image_caption)
		$('.blog-content article').html(blog.post_content)
		$('.fb-share-button').data('href', window.location.href)
		$.each(blog.tags, (i, tag) => $('.tags-container').append(blogTag(tag.name)))
		$.each(blog.other_posts, (i, blog) => $('.other-posts').append(otherBlogPreview(blog)))
		setPageTitle(blog.post_title)
	}

	const setPageTitle = title => document.title = `${title} - Flux Federation`

	const blogTag = tag => `<div class="tag">${tag}</div>`

	const addNewsToIndexPage = (items, type, container) => {
		// $('.show-more').remove()
		html = ``
		n = 0
		for (var i=0; i < 6; i++) {
			if (items.length) {
				n++
				item = items[0]
				n == 1 ? html += `<div class="news-items-row">` : ''
				html += type == 'blog' ? indexBlogPreview(item) : eventItem(item)
				n == 3 || items.length == 1 ? html += `</div>` : ''
				n == 3 ? n = 0 : ''
				items.splice(0, 1)
			}
		}
		// self.blogs.length ? html += showMorePostsButton() : ''
		container.append(html)
	}

	const showMorePostsButton = () => `<div class="show-more show-more-blogs"><div class="flux-button"><a>Show More</a></div></div>`

	const eventDate = event => {
		const start_date = parseDateInfo(event.start_date)
		const end_date = event.end_date ? parseDateInfo(event.end_date) : null
		return `${start_date.weekday} ${start_date.day} ${start_date.month_short} ${event.end_date ? `- ${end_date.weekday} ${end_date.day} ${end_date.month_short}` : ''}`
	}

	const eventItem = event => {
		html = 
		`<div class="m-all t-4of12 news-item">
			<img src="${event.image_url}" class="item-image item-image-logo">
			<h4>${event.title}</h4>
			<div class="cf item-info event-info">
				<div class="cf">
					<p>${eventDate(event)} ${event.start_time && event.end_time ? `${event.start_time}-${event.end_time}` : ''}</p><br>
					<p class="small-text"><a href="${event.ics_file_url}">Add to Calendar</a></p><br>
				</div>
				<div class="cf">
					<p>${event.location.address.split(',')[0]}</p><br>
					<p class="small-text"><a target="_blank" href="${googleMapsUrl(event.location.address)}">View Map</a></p>
				</div>
			</div>
			<p class="preview">${event.description}</p>
			${readMoreEventButton(event.redirect_url)}
		</div>`
		return html
	}

	const googleMapsUrl = address => `http://www.google.com/maps/?q=${encodeURIComponent(address)}`

	const blogPostMeta = blog => {
		console.log(blog)
		date = parseDateInfo(blog.date_written)
		html = 
		`<div class="cf item-info">
			<image class="item-author-image" src="${blog.author_image}"">
			<strong><p class="item-info-text-margin">${blog.author_name}</p></strong>
			<br>
			<p class="item-meta-info">${date.month_short} ${date.day} | ${blog.read_time} min read</p>
		</div>`
		return html
	}

	const readMoreBlogButton = name => `<div class="flux-button news-item-button"><a href="/newsroom/blog/post/?name=${name}">Read More</a></div>`
	
	const readMoreEventButton = url => `<div class="flux-button news-item-button"><a target="_blank" href="${url}">Read More</a></div>`

	const indexBlogPreview = blog => {
		html = 
		`<div class="m-all t-4of12 news-item">
			<a href="post/?name=${blog.post_name}">
				<img src="${blog.banner_image}" class="item-image">
				<h4>${blog.post_title}</h4>
			</a>
			${blogPostMeta(blog)}
			<p class="preview">${blog.post_preview}</p>
			${readMoreBlogButton(blog.post_name)}
		</div>`
		return html
	}

	const otherBlogPreview = blog => {
		html = 
		`<div class="news-item">
			<a class="t-2of5" href="../post/?name=${blog.post_name}">
				<img src="${blog.banner_image}" class="item-image m-all">
			</a>
			<div class="t-3of5 m-all">
				<h4>${blog.post_title}</h4>
				${blogPostMeta(blog)}
				<p class="preview remove-all-padding">${blog.post_preview}</p>
				${readMoreBlogButton(blog.post_name)}
			</div>
		</div>`
		return html
	}





})