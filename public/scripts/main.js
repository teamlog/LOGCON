let history;

onload = function () {
    let form = document.querySelector("form");
    let input = document.querySelector(".input");
    let escapeInput;
    let userInformation = document.querySelector("#user-information");
    history = document.querySelector("#history");


    // form 작동
    form.addEventListener("submit", function () {
        escapeInput = escapeHtml(input.value);
        history.innerHTML += ("<br>" + userInformation.textContent + escapeInput);
        
        commandInspection(escapeInput);
        
        input.value = "";
        (document.querySelector(".terminal")).scrollTop = (document.querySelector(".terminal")).scrollHeight;
    })
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

let cd = /^cd/;
let ls = /^ls$/;
let echo = /^echo\s/;
let login = /^login\s/;
function commandInspection(text) {
    // cd
    if (text.match(cd) != null) {
        switch (text) {
            case "cd" :
                history.innerHTML += ("<br>" + "cd [path]");
                break;
            case "cd home":
                location.href = "index.html";
                break;
            case "cd challenge":
                location.href = "challenge.html";
                break;
            case "cd board":
                location.href = "board.html";
                break;
            case "cd rank":
                location.href = "rank.html";
                break;
            case "cd login":
                location.href = "login.html";
                break;
            case "cd register":
                location.href = "register.html";
                break;
            default:
                history.innerHTML += ("<br>" + "The specified path could not be found.");
                location.href = "404.html";
        }

    // ls
    } else if (text.match(ls) != null) {
        history.innerHTML += ("<br>" + "home" + 
                                "<br>" + "challenge" + 
                                "<br>" + "board" + 
                                "<br>" + "rank" + 
                                "<br>" + "login" +
                                "<br>" + "register");

    // echo
    } else if (text.match(echo) != null) {
        let echoText = text.substring(4);
        history.innerHTML += ("<br>" + echoText);
    
    // login
    } else if (text.match(login) != null) {
        
    }
}