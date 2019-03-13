function create_office_maps(){create_office_map("nz-map",-41.285402,174.776642),create_office_map("aust-map",-37.816193,144.962947),create_office_map("uk-map",52.477391,-1.911156)}function create_office_map(e,t,a){var o=document.getElementById(e),l={lat:t,lng:a},r=[{elementType:"geometry",stylers:[{color:"#f5f5f5"}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f5f5"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#bdbdbd"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#e5e5e5"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#ffffff"}]},{featureType:"road.arterial",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#dadada"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#e5e5e5"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#c9c9c9"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]}],i={center:new google.maps.LatLng(l.lat,l.lng),scrollwheel:!1,zoom:15,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,zoomControl:!0,draggable:!0,scaleControl:!0,keyboardShortcuts:!1,mapTypeControl:!1,zoomControlOptions:{position:google.maps.ControlPosition.RIGHT_CENTER},disableDefaultUI:!0,styles:r},n=new google.maps.Map(o,i),s={url:"/library/img/contact-flux-pin.svg",scaledSize:new google.maps.Size(30,41)};new google.maps.Marker({position:l,optimized:!1,icon:s}).setMap(n)}function get_url_param(e){for(var t=decodeURIComponent(window.location.search.substring(1)),a=t.split("&"),o=void 0,l=0;l<a.length;++l){var r=a[l].split("=");if(r[0]===e){o=r[1];break}}return o}!function($){function e(){var e=$(".meet-the-flux-screens");if(e.length){var t=$(".meet-the-flux-screens .overlay img"),a=t.height(),o=$(".meet-the-flux-screens .overlay").height(),l=a-o,r=$(window).height(),i=.1*-r,n=.6*r,s=e.offset().top-$(document).scrollTop(),p=0;if(s>n);else if(s<i)p=-l;else{var c=(s-i)/(n-i);p=-(1-c)*l}$(t).css("top",p+"px")}}function t(e){var t=$("#header"),a=0;"fixed"===t.css("position")&&(a=t.outerHeight());var o=$("#masthead"),l=$(o).position().top+$(o).outerHeight(),r=$("#careers-nav"),i=r.outerHeight(),n=l-e,s=$("#careers-nav-spacer");n<=a?(r.css({position:"fixed",top:a+"px",zIndex:1}),r.addClass("fixed"),s.length||(s=$('<div id="careers-nav-spacer" />'),o.after(s)),s.css("height",i+"px")):(r.css({position:"relative",top:"auto"}),r.removeClass("fixed"),s.length&&s.detach())}function a(e,t){if(e.length){var a=$(e).attr("id"),o=$(e).attr("class"),l=$(e).attr("src");jQuery.get(l,function(l){var r=$(l).find("svg");void 0!==a&&$(r).attr("id",a),void 0!==o&&$(r).attr("class",o+" replaced-svg"),$(r).removeAttr("xmlns:a"),!$(r).attr("viewBox")&&$(r).attr("height")&&$(r).attr("width")&&$(r).attr("viewBox","0 0 "+$(r).attr("height")+" "+$(r).attr("width")),$(e).replaceWith($(r)),void 0!==t&&t(r)},"xml")}}function o(e,t){$(e+" .arrows3").show()}$(document).ready(function(){a($(".rocket-man img")),$("#jobs").length&&$.getJSON("https://careers.pageuppeople.com/616/flux/en/jobs.json",function(e){if($("#jobs").html(""),e.length){for(var t=16,a="",o=0;o<e.length;++o){var l=e[o],r=Math.floor(16*Math.random())+1;a+='<section class="job job-'+l.Id+'">',a+='<div class="fluxy">',a+='<div class="image">',a+='<img src="../../library/img/fluxies/fluxy-'+r+'.svg" />',a+="</div>",a+="</div>",a+='<div class="description">',a+="<h4>"+l.Title+"</h4>",a+='<p class="large">'+l.Locations+"</p>",a+="<p>"+l.Summary+"</p>",a+='<button class="read-more">Read more</button>',a+='<div class="overview">'+l.Overview,a+='<a class="button" href="'+l.ApplyUrl+'" target="_blank">Apply</a>',a+="</div>",a+="</div>",a+="</section>"}$("#jobs").html(a),$(".job .description button").on("click",function(e){e.preventDefault();var t=$(this),a=$(t).next(".overview");t.length&&a.length&&($(t).hasClass("open")?$(a).slideUp(750,function(){$(t).removeClass("open"),$(t).html("Read more")}):$(a).slideDown(750,function(){$(t).addClass("open"),$(t).html("Read less")}))}),$("main").removeClass("no-jobs")}else $("main").addClass("no-jobs"),$.get("/careers/jobs/no-job-openings.html",function(e){$("#jobs").html(e)})}),$(".video-wrapper .thumbnail-wrapper .thumbnail a").on("click",function(e){e.preventDefault();var t=$(this).data("video-id");if(t.length){var a=$(this).closest(".video-wrapper").find("iframe");a.length&&$(a).attr("src","https://www.youtube.com/embed/"+t+"?autoplay=1")}}),$(".location-page .location-wrapper a").on("click",function(e){e.preventDefault();var t=$(this).attr("href");$("html, body").animate({scrollTop:$(t).offset().top},1500)});var e=!1;$("#get-in-touch-form").validate({rules:{"entry.1629797745":{required:!0,minlength:3,maxlength:30,noNumbers:!0},"entry.368106203":{required:!0,email:!0,emailBetterDomain:!0,minlength:5,maxlength:30},"entry.113701146":{required:!0,minlength:3}},errorPlacement:function(e,t){},submitHandler:function(t){t.submit(),e=!0,setTimeout(function(){window.location="/thank-you/?thank=get-in-touch"},1e3)}}),$("#get-in-touch-response").on("load",function(t){return!e});var t=!1;$("#talk-to-us-form").validate({rules:{"entry.514709734":{required:!0,maxlength:30,minlength:3,noNumbers:!0},"entry.365974255":{required:!0,maxlength:30,minlength:3},"entry.979571740":{required:!0,maxlength:30,minlength:3},"entry.1009693116":{required:!0,email:!0,emailBetterDomain:!0,maxlength:30,minlength:5},"entry.1675168538":{required:!0,minlength:3},"entry.1152685397":{required:!0}},errorPlacement:function(e,t){},submitHandler:function(e){e.submit(),t=!0,setTimeout(function(){window.location="/thank-you/?thank=talk-to-us"},1e3)}}),$("#talk-to-us-response").on("load",function(e){return!t}),$("a.down-arrow").on("click",function(e){e.preventDefault();var t=$(this).attr("href");$("html, body").animate({scrollTop:$(t).offset().top},500)}),$(".what-is-flux-diagram .arrows").length&&o(".what-is-flux-diagram",1),$(".what-is-flux-diagram-mobile .arrows").length&&o(".what-is-flux-diagram-mobile",1);var l=$(".clouds");if(l.length){var r=$(l).children("img");if(r.length){var i=$(window).width();$.each(r,function(e,t){var a=parseInt(Math.random()*i),o=parseInt(Math.random()*$(t).height()*3.5);$(t).css({left:a+"px",top:o+"px",display:"block"})}),setInterval(function(){$.each(r,function(e,t){var a=$(t).position().left,o=$(t).position().top,l=$(t).width();a+=.2+.1*e,a>=$(window).width()&&(a=-l,o=parseInt(Math.random()*$(t).height()*3.5)),$(t).css({left:a+"px",top:o+"px"})})},10)}}var n=get_url_param("thank");void 0!==n&&$("#"+n+"-thank-you").show();var s=get_url_param("scroll");if(void 0!==s){var p=$("#"+s).offset().top;$("html, body").animate({scrollTop:p+"px"},1e3)}});var l=0;$(window).on("resize orientationchange load scroll",function(){var a=$(this).scrollTop()+.5*$(this).height(),o=$("#world-markets");if(o.length){var l=$(o).offset().top+.5*$(o).height(),r=200;l<=a+r&&($(".globe .pin").addClass("animate"),$(".globe .label").addClass("animate"))}var i=$("#flexible-section");if(i.length){var n=$(i).offset().top+.5*$(i).height(),r=200;n<=a+r&&($("#flexible-section .flexible-animation .old-slice").addClass("animate"),$("#flexible-section .flexible-animation .new-slice").addClass("animate"))}var s=$("#simple-section");if(s.length){var n=$(s).offset().top+.5*$(s).height(),r=200;n<=a+r&&($("#simple-section .simple-animation .outer").addClass("animate"),$("#simple-section .simple-animation .middle").addClass("animate"))}$.each($(".parallax"),function(e,t){var o=$(t).find(".parallax-bottom"),l=$(t).find(".parallax-middle"),r=$(t).find(".parallax-top");if(o.length&&l.length&&r.length){var i=$(l).offset().top+.5*$(l).height();0!=i&&($(o).css("top",.05*(a-i)+"px"),$(r).css("top",.15*(a-i)+"px"))}});var p=$(this).scrollTop();p<50&&$("main").hasClass("scroll")?($("#header").removeClass("scroll"),$("main").removeClass("scroll"),setTimeout(function(){t($(window).scrollTop())},250)):p>=50&&!$("main").hasClass("scroll")?($("#header").addClass("scroll"),$("main").addClass("scroll"),setTimeout(function(){t($(window).scrollTop())},250)):t(p),e()})}(jQuery),jQuery.validator.addMethod("emailBetterDomain",function(e,t){var a=this.optional(t);if(!1===a){var o=e.split("@");if(2==o.length){a=o[1].split(".").length>1}}return a},""),jQuery.validator.addMethod("noNumbers",function(e,t){var a=this.optional(t);if(!1===a){var o=new RegExp("[0-9]"),l=parseInt(o.exec(e));a=isNaN(l)}return a},"");