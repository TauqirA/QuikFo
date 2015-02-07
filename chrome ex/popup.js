document.addEventListener('DOMContentLoaded', function () {
document.getElementById("submit").addEventListener("click", myFunction);
});

function myFunction() {
 var url = "http://api.wordnik.com/v4/word.json/"+ document.getElementById("text").value + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
    
   chrome.tabs.create({url: url});
}
