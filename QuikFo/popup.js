function processData(myArr) {
    var i;
    var k = myArr.length;
    var string = "<p>";
    for (i = 0; i < k; i++) {
        var str = "   " + (i + 1) + ". <b>" + myArr[i].partOfSpeech + "- </b>" + myArr[i].text + "<br>";
        string += str;
        if (i == k - 1) {
            string += "<i>" + myArr[i].attributionText + "</i>";
        }
    }

    return string + "</p>";
}
window.addEventListener('load', function(evt) {
    var buttonID = document.getElementById("button");
    var textID = document.getElementById("text");
    if (buttonID)
        document.getElementById("button").addEventListener('click', myFunction);
    if (textID) {
        document.getElementById("text").addEventListener('keypress', function(e) {
            var key = e.which || e.keyCode;
            if (key == 13) { // 13 is enter
                myFunction();
            }
        });
        document.getElementById("text").focus();

        chrome.tabs.executeScript(null, {
            code: "window.getSelection().toString()"
        }, function(resultArr) {
            var str = "" + resultArr;
            document.getElementById("text").value = str.trim();
            myFunction();
        });
    }
});

function myFunction() {
    var word = document.getElementById("text").value.toLowerCase();
    if (document.getElementById("Define").checked) {
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
    } else {
        document.getElementById("definition").innerHTML = "";
    }
    var encode = encodeURIComponent(word);
    if (document.getElementById("wolfA").checked) {
        document.getElementById("wolf").innerHTML = "<iframe id=\"if1\" width=\"100%\" height=\"325\" style=\"visibility:visible\" FRAMEBORDER=\"0\" src=http://m.wolframalpha.com/input/?i=" + encode + "></iframe>";
    } else {
        document.getElementById("wolf").innerHTML = "";
    }
    if (document.getElementById("searchD").checked) {
        document.getElementById("searchddg").innerHTML =
            "<a href=\"https://duckduckgo.com/?q=" + encode+"\" target=\"_blank\">Open Search in New Tab </a><iframe id=\"if1\" width=\"100%\" height=\"325\" style=\"visibility:visible\" FRAMEBORDER=\"0\" src=https://duckduckgo.com/?q=" + encode + "></iframe>";
    } else {
        document.getElementById("searchddg").innerHTML = "";
    }
    if (document.getElementById("wikip").checked) {
        document.getElementById("wiki").innerHTML = "<iframe id=\"if1\" width=\"100%\" height=\"325\" style=\"visibility:visible\" FRAMEBORDER=\"0\" src=http://en.m.wikipedia.org/wiki/" + word + "></iframe>";
    } else {
        document.getElementById("wiki").innerHTML = "";
    }


}