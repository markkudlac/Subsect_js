
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