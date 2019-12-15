$(document).ready(function () {

	$('.case-studies-page').length ? getCaseStudiesData().then(case_study => addCaseStudiesToPage(case_study)) : ''

	function getCaseStudiesData() {
		console.log('testt')
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://cms.fluxfederation.com/wp-json/fluxapi/v1/case-studies",
				crossDomain: true,
				success: data => resolve(data),
				error: error => reject(error)
			})
		})	
	}

	const addCaseStudiesToPage = () => {
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

	const indexCaseStudyPreview = case_study => {
		html = 
		`<div class="m-all t-4of12 news-item">
			<a href="post/?name=${case_study.post_title}">
				<img src="${blog.banner_image}" class="item-image">
				<h4>${case_study.post_title}</h4>
			</a>
			${blogPostMeta(blog)}
			<p class="preview">${blog.post_preview}</p>
			${readMoreButton(blog.post_name)}
		</div>`
		return html
	}



})