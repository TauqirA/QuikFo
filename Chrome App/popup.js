function processData(myArr) {
    var i;
    var k = myArr.length;
    var string = "<p>";
    if (myArr.length > 3) {
        k = 3;
    }
    for (i = 0; i < k; i++) {
        var str = "   "+(i + 1) + ". <b>" + myArr[i].partOfSpeech + "- </b>" + myArr[i].text + "<br>";
        string += str;
        if (i == k - 1) {
            string += "<i>"+myArr[i].attributionText+"</i>";
        }
    }

    return string+"</p>";
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit").addEventListener("click", myFunction);
});
chrome.tabs.executeScript(null,
      {code:"window.getSelection().toString()"},function(resultArr){
	  var str = ""+resultArr;
		document.getElementById("text").value = str.trim()});
function myFunction() {
    var word = document.getElementById("text").value.toLowerCase();
	if(document.getElementById("Define").checked){
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.wordnik.com/v4/word.json/" + word + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            document.getElementById("definition").innerHTML = (processData(myArr));
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
	}
	else{
	document.getElementById("definition").innerHTML = "";
	}
	var encode = encodeURIComponent(word);
	if(document.getElementById("wolfA").checked){
		document.getElementById("wolf").innerHTML = "<iframe id=\"if1\" width=\"100%\" height=\"250\" style=\"visibility:visible\" FRAMEBORDER=\"0\" src=http://m.wolframalpha.com/input/?i="+encode+"></iframe>";
	}
	else{
	document.getElementById("wolf").innerHTML = "";
	}
	if(document.getElementById("bingS").checked){
		document.getElementById("bing").innerHTML = 
		"<iframe id=\"if1\" width=\"100%\" height=\"250\" style=\"visibility:visible\" FRAMEBORDER=\"0\" src=http://m.bing.com/search?q="+encode+"></iframe>";
	}
	else{
	document.getElementById("bing").innerHTML = "";
	}
	if(document.getElementById("wikip").checked){
		document.getElementById("wiki").innerHTML = "<iframe id=\"if1\" width=\"100%\" height=\"250\" style=\"visibility:visible\" FRAMEBORDER=\"0\" src=http://en.m.wikipedia.org/wiki/"+word+"></iframe>";
	}
	else{
	document.getElementById("wiki").innerHTML = "";
	}
	
	
}