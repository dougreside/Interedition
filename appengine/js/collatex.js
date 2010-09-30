
	var curLine=1;
	var curUrl=1;
	var fileContents=[];
	function saveName(fn,winName){
        alert(winName);
		$("#"+winName).parent().append("<span class='fileName' id="+winName+"'>"+fn+"</span>");
		$("#"+winName).hide();
	}
	function removeFile(fileRemove){
		$(fileRemove).parent().remove();
		
	}
	function removeUrl(fileRemove){
		$(fileRemove).parent().remove();
		
	}
	function showContents(me){
		if (me.contentWindow.location.href.substring(me.contentWindow.location.href.lastIndexOf("/")+1) != "fileFrame.html") {
			//for (n in me.contentWindow.document){
				var de=me.contentWindow.document.documentElement;
				
				if (de.nodeName.substring(0,3).toLowerCase()=="tei"){
					fileContents.push("<"+de.nodeName+">"+de.innerHTML+"</"+de.nodeName+">");
				}
				else{
					fileContents.push(de.getElementsByTagName("body")[0].innerHTML);
				}
			//}
			//alert(JSON.stringify(me.contentWindow.document));
			
			
		}
	}
	function newFileLine(){
	
	fileLine = "<div class='fileLine'><span class='fileBox'><iframe frameborder=0 name='file"+curLine+"' id='file"+curLine+"' class='fileFrame' onload='showContents(this)' src='/frames/fileFrame.html'> </iframe></span><span onclick='removeFile(this)' class='divLink'>Remove</span></div>";
	$("#allFiles").append($(fileLine));
	curLine++;
	return;
	}
	function newUrl(){
		var urlLine = "<div><input type='text' name='url"+curUrl+"' id='url"+curUrl+"' class='textfieldX'/><span id='removeUrl' onclick='removeUrl(this)' class='divLink'>X</span></div>";
		$("#allUrls").append($(urlLine));
		curUrl++;
	}
	function showSubmitted(){
		
	}
	function submitForm(){
		var allUris = [];
		$.each($(".textfieldX"),function(index,value){
			alert($(value).val());
			allUris.push($(value).val());
		});
		var allData = "url1="+allUris+"&files="+fileContents;	
		

		$.ajax({
			url: "/return_texts",
			data: allData,
			type: "POST",
			success: function(response){
				alert(response);
			}
		});
	}
	function getData(){
		
	}
	$(document).ready(function(e){
		
		newFileLine();
		newUrl();
		$("#addAnother").click(function(e){
			newFileLine();
		});
		$("#addAnotherUrl").click(function(e){
			newUrl();
		});
		
		
	});
