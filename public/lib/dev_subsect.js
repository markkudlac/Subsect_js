
function processimg(el, imgsrc){
	
	el.src = imgsrc
	
// This is here for audio and is a hack
	if (el.tagName == "SOURCE"){

		el.parentNode.load()
		el.parentNode.play()
	}
}



function tagWithHref(ev) {
	
	return
}


	
function insertDB(table, values, func) {
	
	if (values == null || Object.keys(values).length == 0) {
		alert("Error: Insert values is empty")
		return;
	}
	
	var sqlpk = {table: table, values: values, funcid: ""}
	
	xhrSend('api/insertDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function queryDB(qstr, args, limits, func) {
	
	if (args == null) args = {};
	if (limits == null) limits = {};
	
	var sqlpk = {qstr: qstr, args: args, limits: limits, funcid: ""}
	
	xhrSend('api/queryDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function updateDB(table, values, qstr, args, func) {
	
	if (values == null || Object.keys(values).length == 0) {
		alert("Error: Update values is empty")
		return;
	}
	
	if (qstr == null) { qstr = "";}
	
	var sqlpk = {table: table, values: values, qstr: qstr, args: args, funcid: ""}
	
	xhrSend('api/updateDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function removeDB(table, qstr, args, func) {
	
	if (args == null || Object.keys(args).length == 0) {
		alert("Error: removeDB args is empty")
		return;
	}
	
	if (qstr == null) { qstr = ""	}
	
	var sqlpk = {table: table, qstr: qstr, args: args, funcid: ""};
	
	xhrSend('api/removeDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function xhrSend(dbcall, rtnfunc){
	
	$.ajax({
			url: "http://"+location.host+"/"+dbcall,
			dataFilter: function(xrtn){
//				console.log("In datafileter : " + xrtn);
				return(JSON.parse(xrtn));
			},
			success: rtnfunc,
			error: function(xhr,text){
					alert("XHR Get error : " + text)
			}
	});
}
