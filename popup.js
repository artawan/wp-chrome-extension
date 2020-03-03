function getCurrentTabUrl(callback) {  
	var queryInfo = {
		active: true, 
		currentWindow: true
	};
	chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[0]; 
		var url = tab.url;
		callback(url);
	});
}

function getTabUrl(){
	var queryInfo = {
		active: true, 
		currentWindow: true
	};
	chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[0]; 
		var url = tab.url;
	});
	return url;
}

function getSiteID( url ){
	var siteUrl = url;
	var slice1 = siteUrl.replace('https://', '');
	var slice2 = slice1.split('.', 1);
	var siteID	=	slice2[0];
	return siteID;
}

function getServerID( url ){
	var siteUrl = url;
	// https://123456.findlaw2.flsitebuilder.com
	var slice1 = siteUrl.replace('https://', '');
	var slice2 = slice1.split('.');
	return slice2[1];
}

function renderSiteID(statusText) {
	document.getElementById('siteid').textContent = statusText;
}

/* Generate typography */
jQuery("#generate-typo").click(function() {
	var typography = '<span id="typotest"></span><h1>This is markup test template, and this is H1</h1><p>This is normal paragraph, with a <a href="#">Hyperlink</a> that you <strong>might want (see i am bold)</strong> to check how it looks if you hover it, <a href="#">here is another link</a> in case you missed the first hyperlink.</p><h2>This is H2</h2><p>Normal short paragraph</p><p class="callOut">This paragraph is actually a blockquote in original site but they will look like normal paragraphy in new site and thats ok</p><blockquote>And then THIS PARAGRAPH is the real blockquote that should have the same design with how the old blockquote looks in original site</blockquote><ul><li>Normal UL LI list</li><li>Check the margin/padding</li><li>Make sure it have same bullet as original site</li></ul><ol><li>Normal OL LI list</li><li>Check the margin/padding</li><li>Make sure it have same bullet as original site</li></ol><h3>Another H3 Heading</h3><h4>Another H4 Heading</h4>';
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{
				code: "$('.content').append(" + "'" + typography + "'" + "); + "
					+ "$('#content').append(" + "'" + typography + "'" + "); + "
					+ "$('.content-0').append(" + "'" + typography + "'" + "); + "
					+ "$('.fl-main-content').not('.fl-main-content-title').append(" + "'" + typography + "'" + "); + "
					+ "$('html,body').animate({scrollTop: $('#typotest').offset().top }, 700);"
			});
	});
});

function renderButton(siteID,serverID){
	document.getElementById('checklandingbtn').setAttribute( 'href', 'https://'+ siteID +'.'+ serverID +'.flsitebuilder.com/wp-admin/edit.php?post_type=landing-page');
	document.getElementById('exportbtn').setAttribute( 'href', 'https://flcssgit.smplwp.com/?site=' + siteID + '&export' );
	document.getElementById('optionsbtn').setAttribute( 'href', 'https://'+ siteID +'.'+ serverID +'.flsitebuilder.com/wp-admin/admin.php?page=et_divi_options' );
	document.getElementById('librarybtn').setAttribute( 'href', 'https://'+ siteID +'.'+ serverID +'.flsitebuilder.com/wp-admin/edit.php?post_type=et_pb_layout' );
	document.getElementById('checkNapBtn').setAttribute( 'href', 'https://'+ siteID +'.'+ serverID +'.flsitebuilder.com/wp-admin/options-general.php?page=options-general-php-nap-management' );
	document.getElementById('ninjaFormBtn').setAttribute( 'href', 'https://'+ siteID +'.'+ serverID +'.flsitebuilder.com/wp-admin/options-general.php?page=ninja-forms' );
	document.getElementById('flmigrationsbtn').setAttribute( 'href', 'https://'+ siteID +'.'+ serverID +'.flsitebuilder.com/wp-admin/edit.php?post_type=fl_migration' );
	document.getElementById('themeBuilderBtn').setAttribute( 'href', 'https://'+ siteID +'.'+ serverID +'.flsitebuilder.com/wp-admin/admin.php?page=et_theme_builder' );
}

function generateCSSLink(siteID,serverID){
	var str	= document.getElementById('csslink').value; 
	var n		= str.replace("SITE_ID", siteID);
	var o		= n.replace("SERVER_ID", serverID);
	document.getElementById("csslink").value=o;
}

function convertToLower(){
	var str = document.getElementById('convertLink').value.toLowerCase();
	var r = str.replace(/.html|.shtml/gi,'/');
	var h = r.replace(/href="|"/gi,'');
	document.getElementById('convertLink').value=h;
}

jQuery('#convertLink').click(function () {
	convertToLower();
});

document.addEventListener('DOMContentLoaded', function() {
	getCurrentTabUrl(function(url) {
		var siteID 	= getSiteID(url);
		var serverID = getServerID(url);
		generateCSSLink(siteID,serverID);
		renderSiteID(siteID); 
		renderButton(siteID,serverID);
	});
});