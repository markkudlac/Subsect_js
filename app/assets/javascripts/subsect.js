
/* This must load after JQuery */

/*!
 * jQuery htmlDoc "fixer" - v0.2pre - 8/8/2011
 * http://benalman.com/projects/jquery-misc-plugins/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function($) {
  // RegExp that matches opening and closing browser-stripped tags.
  // $1 = slash, $2 = tag name, $3 = attributes
  var matchTag = /<(\/?)(html|head|body|title|base|meta)(\s+[^>]*)?>/ig;
  // Unique id prefix for selecting placeholder elements.
  var prefix = 'hd' + +new Date;
  // A node under which a temporary DOM tree can be constructed.
  var parent;
	
  $.htmlDoc = function(html) {
		
    // A collection of "intended" elements that can't be rendered cross-browser
    // with .innerHTML, for which placeholders must be swapped.
    var elems = $();
    // Input HTML string, parsed to include placeholder DIVs. Replace HTML,
    // HEAD, BODY tags with DIV placeholders.
    var htmlParsed = html.replace(matchTag, function(tag, slash, name, attrs) {
      // Temporary object in which to hold attributes.
      var obj = {};
      // If this is an opening tag...
      if ( !slash ) {
        // Add an element of this name into the collection of elements. Note
        // that if a string of attributes is added at this point, it fails.
        elems = elems.add('<' + name + '/>');
        // If the original tag had attributes, create a temporary div with
        // those attributes. Then, copy each attribute from the temporary div
        // over to the temporary object.
        if ( attrs ) {
          $.each($('<div' + attrs + '/>')[0].attributes, function(i, attr) {
						
            obj[attr.name] = attr.value;
          });
        }
        // Set the attributes of the intended object based on the attributes
        // copied in the previous step.
        elems.eq(-1).attr(obj);
      }
      // A placeholder div with a unique id replaces the intended element's
      // tag in the parsed HTML string.
      return '<' + slash + 'div'
        + (slash ? '' : ' id="' + prefix + (elems.length - 1) + '"') + '>';
    });

    // If no placeholder elements were necessary, just return normal
    // jQuery-parsed HTML.
    if ( !elems.length ) {
      return $(html);
    }
    // Create parent node if it hasn't been created yet.
    if ( !parent ) {
      parent = $('<div/>');
    }
    // Create the parent node and append the parsed, place-held HTML.
    parent.html(htmlParsed);
    // Replace each placeholder element with its intended element.
    $.each(elems, function(i) {
      var elem = parent.find('#' + prefix + i).before(elems[i]);
      elems.eq(i).html(elem.contents());
      elem.remove();
    });
    // Return the topmost intended element(s), sans text nodes, while removing
    // them from the parent element with unwrap.
    return parent.children().unwrap();
  };

}(jQuery));



// Copy all atributes over for elements
(function($) {
    // Attrs
    $.fn.attrs = function(attrs) {
        var t = $(this);
        if (attrs) {
            // Set attributes
            t.each(function(i, e) {
                var j = $(e);
                for (var attr in attrs) {
                    j.attr(attr, attrs[attr]);
                };
            });
            return t;
        } else {
            // Get attributes
            var a = {},
                r = t.get(0);
            if (r) {
                r = r.attributes;
                for (var i in r) {
                    var p = r[i];
 //                   if (typeof p.nodeValue !== 'undefined') a[p.nodeName] = p.nodeValue;
										if (typeof p.value !== 'undefined') a[p.nodeName] = p.value;
                }
            }
            return a;
        }
    };
})(jQuery);


// This is just here for various test
function testall(){
	
//	var xstr = '<html><head> <script>alert("HD")<\/script> <script src="zzz"><\/script> </head><body id="xbdy" class="xcl"><div id="out"><div id="div1">Hello world</div><div id="div2">Hi there</div></div></body></html>'

var xstr = '<html ng-app><head> '+
        '<meta charset="UTF-8"></meta><title>Subsect Android</title> '+
        '<script src="/localjs/client.js"><\/script> ' +
        '<link rel="stylesheet" type="text/css" href="/localcss/client.css"> ' +
	'<script src="/localjs/client2.js"><\/script> ' +
    '</head><body><h1>HI</h1></body></html>'

	alert("xstr : " + xstr)

	var xhd = $.htmlDoc( xstr );
/*
	var xblob = new Blob(['alert("HI FRED")'], {type : 'text/javascript'})
			        var url = window.URL || window.webkitURL;
			        var srcpath= url.createObjectURL(xblob);
							var reader = new FileReader();
							reader.onload = function(){
							      alert("Blob : " + reader.result);
										xhd.find('head').children().get(1).innerHTML = reader.result;
										$('head').append(xhd.find('head').html())
							    };
							reader.readAsText(xblob)
		*/
				
//	$("html").attrs(xhd.filter("html").attrs()	)
//$.data(xhd.find("h1").get(0), "subsect_h1", "data added here")
//	alert("h1 : " + $.data(xhd.find("h1").get(0), "subsect_h1"))
	//alert("h1 : " + $(xqobj[0]).html())
	//						xhd.find('head').children().get(1).removeAttribute("src")
	//alert("Script : " + xhd.find('head').children().get(1).getAttribute("src"))
	
//	var lnstr = xhd.find('head').children('script[src$="t.js"]').get(0).src
//	alert("head script src: " + lnstr)
	
//	alert("base : " + lnstr.substr(lnstr.indexOf('///') + 2))
}
/**********************************************************************/

var peer = null
var conn = null;
var appPath = null;
var appFile = null;
var rcvbuffer = {};


	function initall(apath, aname){
		
		appPath = apath;
		appName = aname;
		APPURL = "/app";
		LOCALSRC = "localsrc"
		
//			console.log("appPath : " + appPath)
		
	$('#clibut').on("click",function(){
		
		if ($("#clibut").text().indexOf("St") == 0){
			peerClientOn();
			
		} else {
			conn.close();
			conn = null;
			peer.destroy();
			peer = null;
			$("#clibut").remove()
		}
	});

	}
	
	
	function fullPath(locpath){
		
		return(appPath + locpath);
	}
	
	
	function peerClientOn(){
		peer = new Peer( {key: 'wcf528rijzx8byb9', debug: 3});
	
			peer.on('open', function(id) {
			  console.log('My peer ID is: ' + id);
				conn = peer.connect($('#peerid').val(), {reliable: true});
				$("#clibut").text("Close Client")
				callserver()
			});
	}
	
	
	function callserver() {
		
		var rcvhtml = null;
		var filecnt = 0;
		
		conn.on('open', function() {
		  // Receive messages
		  conn.on('data', function(data) {
				
				var xblob;

console.log("In data in : " + data.cnt + "  uri : " + data.uri);
				if (data.cnt == 0){
					xblob = new Blob([ new Uint8Array(data.blob) ], {type : data.blobtype});
				} else {
					if (data.cnt == 1) {
						rcvbuffer[data.uri] = {type: data.blobtype, block: []};
					}
					rcvbuffer[data.uri].block[data.cnt -  1] = new Uint8Array(data.blob);
					
					if (data.cnt == -1) {
						console.log("Returning from data loop");
						xblob = new Blob(rcvbuffer[data.uri].block, {type : data.blobtype});
					} else {
						console.log("In data loop : " + data.cnt + "  blobsize : " +
								rcvbuffer[data.uri].block[0].length);
								
						conn.send(xhrCall(data.uri, data.cnt));
						
						if (data.blobtype.indexOf("audio") == 0) {
							driveStream()
						}
						return
					}
				}
				
//				console.log("all uri : " + data.uri);
				if (data.uri.indexOf('api/') >= 0 ){
					
					console.log("api blob type : " + xblob.type);
					var reader = new FileReader();
					reader.onload = function(){
						
						var xread = JSON.parse(reader.result)
	
						alert("In api result : " + reader.result)
					}
					
					reader.readAsText(xblob);
					
				} else if (xblob.type.indexOf("text") == 0 || 
									xblob.type.indexOf("javascript") > 0){
					var reader = new FileReader();
					reader.onload = function(){
//				      alert("Blob : " + reader.result);
							console.log("Uri  : "+ data.uri)
							
							if (xblob.type.indexOf("html") > 0 ) {
							 rcvhtml = $.htmlDoc( reader.result );
							 filecnt = 0;
							 
//							 alert("htmlDoc : " + rcvhtml.html());
// Clear image tags
							 clearimgsrc(rcvhtml);
							 
							 var headtags = rcvhtml.find('head').children('script').get();
// Transfer attributes							 
							 $("body").attrs(rcvhtml.find('body').attrs());
							 $("head").attrs(rcvhtml.find('head').attrs());
							 $("html").attrs(rcvhtml.filter('html').attrs());
							 
//							 console.log("Number of script head tags : "+ headtags.length)
							 $.each(headtags, function(){
//								 console.log("script head tags src : "+ this.src)
								 if (blockInclude(this.src)) {
								 	this.parentNode.removeChild(this);
								 } else if (islocalfile(this.src)){
									 filecnt++;
//									 console.log("extract head tags src : "+ extractpath(this.src))
									 conn.send(xhrCall(fullPath(extractpath(this.src))));
								 }
							 })
							 
							 headtags = rcvhtml.find('head').children('link[rel="stylesheet"]').get();
							 $.each(headtags, function(){
								 if (islocalfile(this.href)){
									 filecnt++;
									 conn.send(xhrCall(fullPath(extractpath(this.href))));
								 }
							 })
							 
							 loadhead(filecnt, rcvhtml);
							}	else if (xblob.type.indexOf("javascript") > 0) {
								
			//					var rmsrc = data.uri.substr(data.uri.indexOf(appName)+appName.length+4)
								var rmsrc = cleanURI(data.uri)
								var scrpt = rcvhtml.find('head').children('script[src$="'+rmsrc+'"]')
								scrpt.removeAttr("src")
								scrpt.html(reader.result)
								filecnt--;
								loadhead(filecnt, rcvhtml);
							} else if (xblob.type.indexOf("css") > 0) {
								var rmsrc = cleanURI(data.uri)
								var linkcss = rcvhtml.find('head').children('link[href$="'+rmsrc+'"]')
								
				        var locurl = window.URL || window.webkitURL;
				        var hrefurl= locurl.createObjectURL(xblob);
								
								linkcss.attr("href", hrefurl)
								filecnt--;
								loadhead(filecnt, rcvhtml);
							}
				    };
						
	//					console.log("data : "+ data.data)
						reader.readAsText(xblob)
						
					} else if (xblob.type.indexOf("image") == 0) {
	// HTML will be inserted before any image manipulation
						var datatag
		        var url = window.URL || window.webkitURL;
		        var imgurl = url.createObjectURL(xblob);
						
					 $.each($('img').get(), function(){
						 datatag = $.data(this, LOCALSRC)
						 
						 if (datatag !== undefined) {
						 	console.log("img data : " + datatag + " uri : " + data.uri)

							if (data.uri.indexOf(datatag) == 0){
						 		this.src=imgurl
						 	}
						}
					})
						
				} else if (xblob.type.indexOf("audio") == 0) {
						//Audio
					console.log("Audio blob size : " + xblob.size + "  Type : "+xblob.type);
					
					endStream(data.uri);
					}
		  });

		  // Send messages
		  conn.send(xhrCall(fullPath(appName.toLowerCase()) + ".html"));
			});
	}	
	
	
	function blockInclude(str){
		
		return (str.indexOf("jquery-") >= 0 || str.indexOf("dev_subsect.js") >= 0 );
	}
	
	
	function cleanURI(datauri) {
		
		return datauri.substr(datauri.indexOf(appName)+appName.length + APPURL.length)
	}
	
	
	/*
	function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	*/
	
	function clearimgsrc(rcvhtml) {

		 $.each(rcvhtml.find('img').get(), function(){
//			 console.log("clear img src : " + this.src)
			 if (islocalfile(this.src)){
			 	$.data(this, LOCALSRC, fullPath(extractpath(this.src)))
			 	this.removeAttribute("src")
			 }
		 })
		 
		 //Audio
		 $.each(rcvhtml.find('source').get(), function(){
			 console.log("clear source src : " + this.src)
			 if (islocalfile(this.src)){
			 	$.data(this, LOCALSRC, fullPath(extractpath(this.src)))
			 	this.removeAttribute("src")
			 }
		 })
	}
	
	
	function fetchimgsrc(){
		
	 $.each($('img').get(), function(){
//		  console.log("fetchimg  : " + this.src + "  data : "+ $.data(this, LOCALSRC))
		 if (! this.hasAttribute("src") ) {
			 var xdata = $.data(this, LOCALSRC);
			 
			 if (xdata !== undefined) conn.send(xhrCall(xdata));
		 }
	 })
	 
	 $.each($('source').get(), function(){
		  console.log("fetchimg  source tag: " + this.src + "  data : "+ $.data(this, LOCALSRC))
		 if (! this.hasAttribute("src") ) {
			 var xdata = $.data(this, LOCALSRC);
			 
			 if (xdata !== undefined) conn.send(xhrCall(xdata));
		 }
	 })
	}
	
	
	function processimg(el, imgsrc){
		
		if (imgsrc != null){
			$.data(el, LOCALSRC, fullPath(imgsrc))
		}
		conn.send(xhrCall(fullPath(imgsrc)))
	}
	
	
	function xhrCall(file, cnt, type){
		
		if (cnt === undefined || cnt === null) {cnt = 0 }
		if (type === undefined || type === null) {type = "GET" }
		
		return({type: type, file: file, cnt: cnt});
	}
	
	
	function islocalfile(pathstr){
		
		if (pathstr.indexOf("file:") == 0) return true
		return(location.host.length > 0 && pathstr.indexOf(location.host) >= 0)
	}
	
	
	function extractpath(pathstr){
		
		if (pathstr.indexOf("file:") == 0) return pathstr.substr(pathstr.indexOf('///') + 2);
		
		var hostoff = pathstr.indexOf(location.host);
		if ( location.host.length > 0 && hostoff >= 0) {
			
			var xpath = pathstr.substr(hostoff + location.host.length+4)
			if (xpath.indexOf('/') == 0) xpath = xpath.substr(1)
//				console.log("raw ex 1 : " + pathstr + " path : " + xpath)
			return  xpath;
		} else {
			return pathstr;
		}
	}
	
	
	function loadhead(filecnt, rcvhtml) {
		
		if (filecnt == 0) {
			$('head').append(rcvhtml.find('head').children())
			$('body').append(rcvhtml.find('body').children())
			
			fetchimgsrc();
		}
	}
	

function tagWithHref(ev) {

	var xhref = $(this).attr("href")
	
	if (xhref.indexOf("http") < 0){
		ev.preventDefault();
		conn.send(xhrCall(xhref))
	}
}


function driveStream() {
	
 $.each($('source').get(), function(){
//	  console.log("DriveStream tag: " + this.src + "  data : "+ $.data(this, LOCALSRC))
	 if (! this.hasAttribute("src") && $.data(this, LOCALSRC) !== undefined &&
 					bufferStart($.data(this, LOCALSRC))) {
						
						this.parentNode.removeEventListener("ended", streamEnd);
						playstream(this, $.data(this, LOCALSRC))
						this.parentNode.addEventListener("ended", streamEnd);
	 }
 })
}


function endStream(file) {
	
 $.each($('source').get(), function(){
	  console.log("EndStream tag: " + this.src + "  data : "+ $.data(this, LOCALSRC))
	 if ($.data(this, LOCALSRC) !== undefined &&
 					$.data(this, LOCALSRC).indexOf(file) == 0) {
						
						this.parentNode.removeEventListener("ended", streamEnd);
						playstream(this, $.data(this, LOCALSRC))
						rcvbuffer[file] = null;
	 }
 })
}


function bufferStart(buffkey) {
	
	var xblock = rcvbuffer[buffkey].block;
	var tot = 0;
	
	for (i=0; i<xblock.length; i++){
		tot = tot + xblock[i].length;
	}
	return(tot > 500000);
}


function streamEnd(){
	
	$.each($(this).children('source'), function(){
//		console.log("children : " + this.id)
		if ($.data(this, LOCALSRC) !== undefined){
			playstream(this, $.data(this, LOCALSRC))
		}
	})
}


function playstream(el, buffkey) {
						var timespot;
						var url = window.URL || window.webkitURL;
						var timedelay = 1000;
		        var audurl;
					
							el.parentNode.pause();
							timespot = el.parentNode.currentTime
							console.log("Paused time  : " + timespot)
						
							if (el.src !== undefined && el.src.length > 0) {
//								console.log("In revoke");
								url.revokeObjectURL(el.src);
							} else {
								timedelay = 0;
							}
							
							audurl = url.createObjectURL(new Blob(rcvbuffer[buffkey].block,
														 	{type : rcvbuffer[buffkey].type}));
					 		el.src=audurl;
						
							setTimeout(function(){
							el.parentNode.load();
							el.parentNode.currentTime = timespot;
							el.parentNode.play();	
							}, timedelay)
}
	
	
function insertDB(table, values) {
	
	if (values == null || Object.keys(values).length == 0) {
		alert("Error: Insert values is empty")
		return;
	}
	
	var sqlpk = {table: table, values: values}
	
	conn.send(xhrCall('api/insertDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk))))
}


function queryDB(qstr, args, limits) {
	
	if (args == null) args = {};
	if (limits == null) limits = {};
	
	var sqlpk = {qstr: qstr, args: args, limits: limits}
	
	conn.send(xhrCall('api/queryDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk))))
}


function updateDB(table, values, qstr, args) {
	
	if (values == null || Object.keys(values).length == 0) {
		alert("Error: Update values is empty")
		return;
	}
	
	if (qstr == null) { qstr = "";}
	
	var sqlpk = {table: table, values: values, qstr: qstr, args: args}
	
	conn.send(xhrCall('api/updateDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk))))
}


function removeDB(table, qstr, args) {
	
	if (args == null || Object.keys(args).length == 0) {
		alert("Error: removeDB args is empty")
		return;
	}
	
	if (qstr == null) { qstr = ""	}
	
	var sqlpk = {table: table, qstr: qstr, args: args}
	
	conn.send(xhrCall('api/removeDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk))))
}
