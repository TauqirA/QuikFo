document.addEventListener('DOMContentLoaded', function () {
document.getElementById("submit").addEventListener("click", myFunction);
});
function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
}