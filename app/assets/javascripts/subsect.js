
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
                    if (typeof p.nodeValue !== 'undefined') a[p.nodeName] = p.nodeValue;
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

console.log("Protocol : " + location.protocol)
console.log("Host : " + location.host)

	function initall(){
		
	$('#clibut').on("click",function(){
		console.log("clibut: pressed")
		
		if ($("#clibut").val().indexOf("St") == 0){
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
	
	function peerClientOn(){
		peer = new Peer( {key: 'wcf528rijzx8byb9', debug: 3});
	
			peer.on('open', function(id) {
			  console.log('My peer ID is: ' + id);
				conn = peer.connect($('#peerid').val());
				$("#clibut").val("Close Client")
				callserver()
			});
	}
	
	
	function callserver() {
		
		var rcvhtml = null;
		var filecnt = 0;
		
		conn.on('open', function() {
		  // Receive messages
		  conn.on('data', function(data) {
//		    console.log('Received : ' + data);
				
				var xblob = new Blob([ new Uint8Array(data.blob) ], {type : data.blobtype});
				
				if (xblob.type.indexOf("text") == 0 || xblob.type.indexOf("javascript") > 0){
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
								 
								 if (islocalfile(this.src)){
									 filecnt++;
//									 console.log("extract head tags src : "+ extractpath(this.src))
									 conn.send('SysHtml/TestApp' + extractpath(this.src));
								 }
							 })
							 
							 headtags = rcvhtml.find('head').children('link[rel="stylesheet"]').get();
							 $.each(headtags, function(){
								 if (islocalfile(this.href)){
									 filecnt++;
									 conn.send('SysHtml/TestApp' + extractpath(this.href));
								 }
							 })
							 
							 loadhead(filecnt, rcvhtml);
							}	else if (xblob.type.indexOf("javascript") > 0) {
								
								var rmsrc = data.uri.substr(data.uri.indexOf('TestApp')+7)
								var scrpt = rcvhtml.find('head').children('script[src$="'+rmsrc+'"]')
								scrpt.removeAttr("src")
								scrpt.html(reader.result)
//								alert("Injected javascript : "+ rcvhtml.find('head').html())
								filecnt--;
								loadhead(filecnt, rcvhtml);
							} else if (xblob.type.indexOf("css") > 0) {
								var rmsrc = data.uri.substr(data.uri.indexOf('TestApp')+7)
								var linkcss = rcvhtml.find('head').children('link[href$="'+rmsrc+'"]')
								
				        var locurl = window.URL || window.webkitURL;
				        var hrefurl= locurl.createObjectURL(xblob);
								
								linkcss.attr("href", hrefurl)
//								alert("set css href : "+ rcvhtml.find('head').html())
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
						
						var rmsrc = data.uri.substr(data.uri.indexOf('TestApp')+7)
						
					 $.each($('img').get(), function(){
						 datatag = $.data(this, "subsect_src")
						 
						 if (datatag !== undefined) {
//						 	console.log("img data : " + datatag)
						 	if (datatag == rmsrc){
						 		this.src=imgurl
						 	}
						}
					 })
					}
		  });

		  // Send messages
		  conn.send('SysHtml/TestApp/index.html');
			});
	}	
	
	
	function clearimgsrc(rcvhtml) {

		 $.each(rcvhtml.find('img').get(), function(){
//			 console.log("clear img src : " + this.src)
			 if (islocalfile(this.src)){
			 	$.data(this, "subsect_src", extractpath(this.src))
			 	this.removeAttribute("src")
			 }
		 })
	}
	
	
	function fetchimgsrc(){
		
	 $.each($('img').get(), function(){
//		  console.log("fetchimg  : " + this.src + "  data : "+ $.data(this, "subsect_src"))
		 if (! this.hasAttribute("src") ) {
			 var xdata = $.data(this, "subsect_src");
			 
			 if (xdata !== undefined) conn.send('SysHtml/TestApp' + xdata);
		 }
	 })
	}
	
	
	function processimg(jqry,imgsrc){
		
		if (imgsrc != null){
			$.data(jqry[0],"subsect_src", imgsrc)
		}
		conn.send('SysHtml/TestApp'+imgsrc)
	}
	
	
	function islocalfile(pathstr){
		
		if (pathstr.indexOf("file:") == 0) return true
		return(location.host.length > 0 && pathstr.indexOf(location.host) >= 0)
	}
	
	
	function extractpath(pathstr){
		
		if (pathstr.indexOf("file:") == 0) return pathstr.substr(pathstr.indexOf('///') + 2);
		
		var hostoff = pathstr.indexOf(location.host);
		if ( location.host.length > 0 && hostoff >= 0) {
			return  pathstr.substr(hostoff + location.host.length);
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
	