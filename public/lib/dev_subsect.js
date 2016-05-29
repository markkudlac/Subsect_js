
document.writeln('<script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>');
document.writeln('<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>');
document.writeln('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">');
document.writeln('<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>');
document.writeln('<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.min.js"></script>');


function alertmodal(str, func){
  
	generateAlertHtml();
	
	$("#continueop").off("click").removeClass("hidden");
	$('#modaltitle').removeClass("alert-danger").removeClass("alert-info");
	if (typeof func !== "function"){
		$('#modaltitle').text("Alert").addClass("alert-danger");
		$("#continueop").addClass("hidden")
	} else {
		$('#modaltitle').text("Confirm").addClass("alert-info");
		$("#continueop").one("click", func);
	}
	
  $('#alertmess').text(str)
  $('#alertmodal').modal('show')
}


function generateAlertHtml(){
	
	if ($("#alertmodal").length == 0){
		$('body').append(
'<div id="alertmodal" class="modal fade"><div class="modal-dialog"><div class="modal-content"> \
<div class="modal-header"><h4 id="modaltitle" class="modal-title alert-danger" \
style="padding-left: 10px">Alert</h4></div><div class="modal-body"><p id="alertmess"></p> \
</div><div class="modal-footer"><button class="btn btn-default" data-dismiss="modal"> \
Close</button><button id="continueop" class="btn btn-primary hidden" \
data-dismiss="modal">Continue</button></div></div></div>/div>'
		);
	}
}	


function toast(jqstr, str){

	var jqobj = $(jqstr);
    jqobj.popover({content: str, placement: "bottom", triggetr: "manual"}).popover("show");
    setTimeout(function(){jqobj.popover("destroy")}, 3000);
} 	
	
	
	
var SUB_GLB = {
	SYS_DIR: "sys",
	DB_SYS: "S_",
	DB_USR: "U_",
	AUD_SRC: "SOURCE",
	LOCAL: "L$_",
	subrmt: {},	//was null
	useRTC: false
};

// console.log("Using Local 4 dev_subsect");

SUB_GLB.getDbName = function(){
	
	var xpath = location.pathname;
	var dbnm = "";
	
	xpath = xpath.substring(1);
//	console.log("location : "+xpath);
	xpath = xpath.split("/")
	
	dbnm = (xpath[0].indexOf(this.SYS_DIR) == 0) ? this.DB_SYS : this.DB_USR;
	xpath = xpath[1].split("#");
	dbnm = dbnm + xpath[0]
	return dbnm;
}


function processimg(el, imgsrc){
	
	el.src = imgsrc
	
// This is here for audio and is a hack
	if (el.tagName == SUB_GLB.AUD_SRC){

		el.parentNode.load()
		el.parentNode.play()
	}
}

	
function insertDB(table, values, func, password, subdb) {
	
	if (values == null || Object.keys(values).length == 0) {
		alert("Error: Insert values is empty")
		return;
	}

	if (password == null) password = "";
	if (subdb == null) subdb = SUB_GLB.getDbName();
	
	var sqlpk = {db: subdb, table: table, values: values, funcid: "", password: password};
	
	xhrSend('api/insertDB', 'sqlpk=' +
			encodeURIComponent(JSON.stringify(sqlpk)),func, "POST")
}


function queryDB(qstr, args, limits, func, subdb) {
	
	if (args == null) args = {};
	if (limits == null) limits = {};
	if (subdb == null) subdb = SUB_GLB.getDbName();
	
	var sqlpk = {db: subdb, qstr: qstr, args: args, limits: limits, funcid: ""}
	
	xhrSend('api/queryDB', 'sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function updateDB(table, values, qstr, args, func, password, subdb) {
	
	if (values == null || Object.keys(values).length == 0) {
		alert("Error: Update values is empty")
		return;
	}
	
	if (qstr == null) { qstr = "";}
	if (password == null) password = "";
	if (subdb == null) subdb = SUB_GLB.getDbName();
	
	var sqlpk = {db: subdb, table: table, values: values,
							qstr: qstr, args: args, funcid: "", password: password}
	
	var argstr = 'sqlpk='+ encodeURIComponent(JSON.stringify(sqlpk));
	
	xhrSend('api/updateDB', argstr, func, "POST")					
}


function removeDB(table, qstr, args, func, password, subdb) {
	
	if (args == null || Object.keys(args).length == 0) {
		alert("Error: removeDB args is empty")
		return;
	}
	
	if (qstr == null) { qstr = "" }
	if (password == null) password = "";
	if (subdb == null) subdb = SUB_GLB.getDbName();
	
	var sqlpk = {db: subdb, table: table, qstr: qstr, args: args, funcid: "", password: password};
	
	xhrSend('api/removeDB', 'sqlpk='+ 
			encodeURIComponent(JSON.stringify(sqlpk)),func)
}


function getMenu(func) {
	xhrSend('api/getMenu/-1','',func);
}


function testPassword(passwd, tokenflg, func){
	xhrSend('api/testPassword/' + passwd + '/' + (tokenflg ? 'T' : 'P') + '/-1', "", func);
	
}


function getToken(func){
	xhrSend('api/getToken/-1', "", func);
	
}

function xhrSend(dbcall, argstr, rtnfunc,httpmethod){
	
	if (!httpmethod) httpmethod = "GET";
	
	// There is a cross domain problem with PUT
	
	$.ajax({	
		url: getBaseUrl() + dbcall,
		cache: false,
		method: httpmethod,
		data: argstr,
		dataFilter: function(xrtn){
				return(JSON.parse(xrtn));
			},
		success: rtnfunc,
		error: function(xhr,text){
					alert("XHR Get error : " + text)
			}
	});
}


function getBaseUrl(){
	var tmpurl;
	
	// This is for testing when using nodejs port == 3030
	
	if (location.port.indexOf("3030") == 0){
		var xdbhost = getParam("dbhost");
		
		if (xdbhost.length > 0){
//			console.log("Use database host : " + xdbhost);
			tmpurl = "http://"+xdbhost+"/";
		} else {
			tmpurl = "http://testdbhost:8080/";
		}
	} else {
		tmpurl = "http://"+location.host+"/";
	}
	return tmpurl;
}



function remotecall(subname, path, func, args, rtnval){

// This is much reduced for testing. Can only connect to local dev phone once.
	if (subname === null || subname.length == 0) subname = SUB_GLB.LOCAL;
	var fld = remoteKey(subname, path);
	
	var dbnm = (xpath[0].indexOf(SUB_GLB.SYS_DIR) == 0) ? SUB_GLB.DB_SYS : SUB_GLB.DB_USR;
		dbnm = dbnm + xpath[1]
	
	if (SUB_GLB.subrmt[fld] === undefined){
		$.ajax({	
			url: "http://"+location.host+"/" + path + "/js/api.json",
			method: "GET",
			cache: false,
			dataType: "text",
			success: function(xrtn){
//				alert("Got JSON 2 : " + xrtn);
				SUB_GLB.subrmt[fld] = eval('( ' + xrtn +  ' )');
			
				SUB_GLB.subrmt[fld][func](args, rtnval, dbnm);
			},
			error: function(xhr,text){
						alert("XHR Get error : " + text)
				}
		});
	
	} else {
		SUB_GLB.subrmt[fld][func](args, rtnval, dbnm);
	}
}


function remoteclose(subname, path){
// path like sys/TestSite
	
	if (subname == null || path == null){

		for(var propName in SUB_GLB.subrmt) {
//			console.log("remoteclose 1 : " + propName)	    
			if (subname == null || propName.startsWith(subname+"_")) {
				delete SUB_GLB.subrmt[propName];	
			}
		}
	} else {
		var fld = remoteKey(subname, path);
//	console.log("Removing remoteclose link 2 : " + fld);
		delete SUB_GLB.subrmt[fld];	
		return true;
	}	
}

function remoteKey(subname, xpath){

 	var pathary = splitpath(xpath);
 	return(subname+"_"+pathary[0]+pathary[1]);
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


function subsect_useRTC(){
	return(false);
}


function splitpath(apath) {
	apath = apath.trim();
	if (apath.startsWith("/")) apath = apath.substr(1);
	return(apath.split("/"));
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + JSON.stringify(cvalue) + "; " + expires + "; path=/; domain=.subsect.net";
}


function getCookie(cname) {
	
    var name = cname + "=";
    var ca = document.cookie.split(';');
	
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return {};
}


function deleteCookie(cname) {
	
	var xdel = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.subsect.net";
	console.log("Deleting cookie : " + xdel)
	document.cookie = xdel;
}
