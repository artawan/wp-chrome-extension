var tabUrl = document.location.href;

// Only run if its findlaw site and not in admin
if(tabUrl.indexOf("findlaw1.flsitebuilder.com") >= 0 && tabUrl.indexOf("wp-admin") <= 1 && tabUrl.indexOf("wp-content") <= 1 ){
	var siteID = getSiteID( tabUrl );
	console.log( 'FindLaw site ' + siteID );
} 

if( jQuery('a[href="https://www.findlaw.com/"]').text() == 'FindLaw' ){
	
	jQuery('html').prepend('<style>@media(max-width:980px){ .typographyPopup { margin-left: 0 !important; width: 100% !important; position:absolute !important; top: 0 !important; left: 0 !important; padding: 10px !important; } }</style>');
	jQuery('body').append('<a href="#" id="checkTypography" style="font-size: 20px;padding: 15px 20px;font-weight: bold;border-radius: 4px;background-color:#2ecc71;color:#fff;position:fixed;z-index: 999999;bottom: 10px;text-decoration: none;left: 10px;">T</a>');
	
	jQuery(document).ready(function ($) {
		$('body').on('click', '#checkTypography', function(e){
			e.preventDefault();
			checkTypography();
			jQuery('.typographyOverlay').fadeIn();
		});

		$('body').on('click', '#toClose', function(e){
			e.preventDefault();
			jQuery('.typographyOverlay').fadeOut();
		});

		jQuery(window).on('resize', function(){
			//jQuery('html,body').scrollTop(0);
			checkTypography();
			//jQuery('.typographyOverlay').fadeIn();
		});
	});

	function checkTypography(){

			jQuery('.typographyOverlay').remove();

			var siteTitle = jQuery('[property="og:site_name"]').attr('content');
			var siteTagline = jQuery('[property="og:title"]').attr('content');

			var containerWidth = jQuery('.container-columns').width();
			var headingFontFamily = jQuery('h1.page-title').css('font-family');
	
			var headingFontSize = jQuery('h1.page-title').css('font-size');
			var headingFontSizeCalc = headingFontSize.toString().replace('px', '');
	
			var headingFontWeight = jQuery('h1.page-title').css('font-weight');
	
			var headingLineHeightpx = jQuery('h1.page-title').css('line-height');
			if( headingLineHeightpx == 'normal' ){
				headingLineHeight = 1;
			} else {
				var headingLineHeightCalc = headingLineHeightpx.toString().replace('px','');
				var headingLineHeight = headingLineHeightCalc/headingFontSizeCalc;
			}
			
	
			var headingLetterSpacing = jQuery('h1.page-title').css('letter-spacing');
			var headingColor = jQuery('h1.page-title').css('color');
	
			var textFontFamily = jQuery('.content p').css('font-family');
			var textFontSize = jQuery('.content p').css('font-size');
			var textFontSizeCalc = textFontSize.toString().replace('px', '');
	
			var textFontWeight = jQuery('.content p').css('font-weight');
	
			var textLineHeightpx = jQuery('.content p').css('line-height');
	
			if( textLineHeightpx == 'normal' ){
				textLineHeight = 1;
			} else {
				var textLineHeightCalc = textLineHeightpx.toString().replace('px', '');
			var textLineHeight = textLineHeightCalc/textFontSizeCalc;
			}
			var textLetterSpacing = jQuery('.content p').css('letter-spacing');
			var textColor = jQuery('.content p').css('color');
			var textLinkColor = jQuery('.content a').css('color');
	
			jQuery('body').append('<div class="typographyOverlay" style="position:fixed; display: none; width: 100%; height: 100%; background: rgba(0,0,0,0.6); left: 0; top: 0;"><div class="typographyPopup"  style="overflow:scroll;position:fixed; width: 600px; height: 90vh; top: 0; left: 50%; margin-left: -300px; z-index:9999999; background: #fff; padding: 30px 40px; border-radius:4px; margin-top: 5vh;"><a style="position:absolute; right: 20px; top: 20px;" href="#" id="toClose">Close</a><h1 style="margin-top: 0;">Site Width: ' + containerWidth + 'px</h1><ul style="font-size: 20px; list-style-type:none; padding: 0; line-height: 1.5;"><li>Site title: <input style="display: block; width: 100%; padding: 10px; background: #f5f5f5; border: 1px solid #e4e4e4; border-radius: 4px; margin-bottom: 15px;" type="text" value="'+ siteTitle +'" readonly></li><li>Tagline: <input style="display: block; width: 100%; padding: 10px; background: #f5f5f5; border: 1px solid #e4e4e4; border-radius: 4px; margin-bottom: 15px;" type="text" value="' + siteTagline + '" readonly></li></ul><h3>Heading</h3><ul style="font-size: 20px; list-style-type:none; padding: 0; line-height: 1.5;"><li>Font Family: '+ headingFontFamily +'</li><li>Font Size: '+ headingFontSize +'</li><li>Font Weight: '+ headingFontWeight +'</li><li>Line Height: '+ headingLineHeight +'</li><li>Letter Spacing: '+ headingLetterSpacing +'</li><li>Color: '+ headingColor +'</li></ul><h3>Body</h3><ul style="font-size: 20px; list-style-type:none; padding: 0; line-height: 1.5;"><li>Font Family: '+ textFontFamily +'</li><li>Font Size: '+ textFontSize +'</li><li>Font Weight: '+ textFontWeight +'</li><li>Line Height: '+ textLineHeight +'</li><li>Letter Spacing: '+ textLetterSpacing +'</li><li>Color: '+ textColor +'</li><li>Link Color: '+ textLinkColor +'</li></ul></div></div>');
	}

}

function getSiteID( url ){
	var siteUrl = url;
	var slice1 = siteUrl.replace('https://', '');
	var slice2 = slice1.split('.', 1);
	var siteID	=	slice2[0];
	return siteID;
}

function loadCss(url){
	var link 	= document.createElement("link");
	link.href 	= url;
	link.type 	= "text/css";
	link.rel 	= "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);
}