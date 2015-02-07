function processData(myArr){
	var i;
	var k = myArr.length;
	var string = "";
	if(myArr.length > 3){
		k = 3;
	}
	for(i = 0; i < k; i++){
		string += myArr[i].text + "<br>";
	}
	return string;	
}
document.addEventListener('DOMContentLoaded', function () {
document.getElementById("submit").addEventListener("click", myFunction);
});
function myFunction() {
var xmlhttp = new XMLHttpRequest();
var word = document.getElementById("text").value.toLowerCase();
var url = "http://api.wordnik.com/v4/word.json/"+word+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var myArr = JSON.parse(xmlhttp.responseText);
	document.getElementById("definition").innerHTML =(processData(myArr));
    }
}

xmlhttp.open("GET", url, true);
xmlhttp.send();
}