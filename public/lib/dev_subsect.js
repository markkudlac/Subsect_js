

var SYS_DIR = "sys";
var DB_SYS = "S_";
var DB_USR = "U_";

// This must be after above defs
var dbname = getDbName();

function processimg(el, imgsrc){
	
	el.src = imgsrc
	
// This is here for audio and is a hack
	if (el.tagName == "SOURCE"){

		el.parentNode.load()
		el.parentNode.play()
	}
}


/*
function tagWithHref(ev) {
	
	ev.preventDefault();

		var xhref = $(this).attr("href")
	console.log("tag 1 href : "+xhref);
	
		if (xhref.indexOf("http") < 0){
			
			if (xhref.indexOf("TestApp") >= 0) {
				xhref = "http://"+location.host + "/"+SYS_DIR+"/TestApp/testapp.html"
			}
		}
		console.log("tag 2 href : "+xhref)
		location.assign(xhref);
}
*/

	
function insertDB(table, values, func) {
	
	if (values == null || Object.keys(values).length == 0) {
		alert("Error: Insert values is empty")
		return;
	}
	
	var sqlpk = {db: dbname, table: table, values: values, funcid: ""}
	
	xhrSend('api/insertDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function queryDB(qstr, args, limits, func) {
	
	if (args == null) args = {};
	if (limits == null) limits = {};
	
	var sqlpk = {db: dbname, qstr: qstr, args: args, limits: limits, funcid: ""}
	
	xhrSend('api/queryDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function updateDB(table, values, qstr, args, func) {
	
	if (values == null || Object.keys(values).length == 0) {
		alert("Error: Update values is empty")
		return;
	}
	
	if (qstr == null) { qstr = "";}
	
	var sqlpk = {db: dbname, table: table, values: values,
							qstr: qstr, args: args, funcid: ""}
	
	xhrSend('api/updateDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function removeDB(table, qstr, args, func) {
	
	if (args == null || Object.keys(args).length == 0) {
		alert("Error: removeDB args is empty")
		return;
	}
	
	if (qstr == null) { qstr = ""	}
	
	var sqlpk = {db: dbname, table: table, qstr: qstr, args: args, funcid: ""};
	
	xhrSend('api/removeDB?sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function getMenu(func) {
	
	xhrSend('api/getMenu/-1',func);
}


function xhrSend(dbcall, rtnfunc){

	var tmpurl;
	
	// This is for testing when using nodejs port == 3030
	
	if (location.port.indexOf("3030") == 0){
		var xdbhost = getParam("dbhost");
		
		if (xdbhost.length > 0){
			console.log("Use database host : " + xdbhost);
			tmpurl = "http://"+xdbhost+"/"+dbcall;
		} else {
			tmpurl = "http://192.168.1.108:8080/"+dbcall;
		}
	} else {
		url: "http://"+location.host+"/"+dbcall;
	}
	$.ajax({
		
		url: tmpurl,
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


function getDbName(){
	
	var xpath = location.pathname;
	var dbnm = "";
	
	xpath = xpath.substring(1);
	console.log("location : "+xpath);
	xpath = xpath.split("/")
	
	dbnm = (xpath[0].indexOf(SYS_DIR) == 0) ? DB_SYS : DB_USR;
	xpath = xpath[1].split("#");
	dbnm = dbnm + xpath[0]
	
	console.log("DB name : "+dbnm);
	return dbnm;
}


function getParam(val) {

    tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === val) return(tmp[1]);
    }
    return "";
}


