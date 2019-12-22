$(document).ready(function () {

	if ($('.case-studies-page').length) {
		getCaseStudiesData().then(case_studies => {
			self.case_studies = case_studies
			addCaseStudiesToIndexPage(case_studies)
		})
	}

	$('.single-case-study-page').length ? getSingleCaseStudy().then((case_study) => addCaseStudyToPage(case_study)) : ''

	function getSingleCaseStudy() {
		const postName = () => new URL(document.location).searchParams.get('name')
		if(postName()) {
			return new Promise((resolve, reject) => {
				$.ajax({
					url: `https://cms.fluxfederation.com/wp-json/fluxapi/v1/case-study/${postName()}`,
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


	function getCaseStudiesData() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "https://cms.fluxfederation.com/wp-json/fluxapi/v1/case-studies",
				crossDomain: true,
				success: data => resolve(data),
				error: error => reject(error)
			})
		})	
	}

	const addCaseStudiesToIndexPage = (items = self.case_studies, container = $('.case-studies-section')) => {
		html = ``
		n = 0
		for (var i=0; i < 6; i++) {
			if (items.length) {
				n++
				item = items[0]
				n == 1 ? html += `<div class="news-items-row">` : ''
				html += indexCaseStudyPreview(item)
				n == 3 || items.length == 1 ? html += `</div>` : ''
				n == 3 ? n = 0 : ''
				items.splice(0, 1)
			}
		}
		container.append(html)
	}

	const indexCaseStudyPreview = case_study => {
		console.log(case_study)
		html = 
		`<div class="m-all t-4of12 news-item">
			<a href="post/?name=${case_study.post_name}">
				<img src="${case_study.logo}" class="item-image">
				<h4>${case_study.post_title}</h4>
			</a>
			<p class="preview">${case_study.subheader}</p>
			${readMoreButton(case_study.post_name)}
		</div>`
		return html
	}

	const readMoreButton = name => `<div class="flux-button news-item-button"><a href="/solutions/case-studies/post?name=${name}">Read More</a></div>`

	const addCaseStudyToPage = case_study => {
		case_study.post_content == "" ? redirectBack() : ''
		$('.case-study-title').text(case_study.post_title)
		// $('.banner-image').attr('src', case_study.banner_image)
		// $('.banner-image-caption').text(case_study.banner_image_caption)
		console.log(case_study.post_content)
		$('.case-study-content article').html(case_study.post_content)
		// $('.fb-share-button').data('href', window.location.href)
		// $.each(case_study.tags, (i, tag) => $('.tags-container').append(blogTag(tag.name)))
		// $.each(case_study.other_posts, (i, blog) => $('.other-posts').append(otherBlogPreview(blog)))
		setPageTitle(case_study.post_title)
	}

	const setPageTitle = title => document.title = `${title} - Flux Federation`

})








