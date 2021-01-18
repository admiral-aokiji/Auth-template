console.log("LOADED")
var bodyRegister = document.querySelector(".body-register")
var bodyLogin = document.querySelector(".body-login")
var bodyHowTo = document.querySelector(".body-howTo")
function addEventListenerByClass(className, fn) {
    var l = document.getElementsByClassName(className)
    for (var i=0; i < l.length; i++) {
        console.log(i, l[i], this)
        l[i].addEventListener("click", fn)
    }
}
function login() {
    bodyLogin.style.display = "block"
    bodyRegister.style.display = "none"
    bodyHowTo.style.display = "none"
}
function register() {
    bodyLogin.style.display =  "none"
    bodyRegister.style.display ="block"
    bodyHowTo.style.display = "none"
}
function howto() {
    bodyLogin.style.display =  "none"
    bodyRegister.style.display ="none"
    bodyHowTo.style.display = "block"
}
addEventListenerByClass("login", login);
addEventListenerByClass("register", register);
addEventListenerByClass("howto", howto);

