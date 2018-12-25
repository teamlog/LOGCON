let history;
let currentURL = location.protocol + "//" + location.host;

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
         .replace(/"/g, "")
         .replace(/'/g, "");
}

let cd = /^cd/;
let ls = /^ls$/;
let echo = /^echo\s/;
let login = /^login\s/;
let register = /^register\s/;
let auth = /^auth\s/;
let comment = /^comment\s/;
let reverify = /^reverify\s/;
let exit = /^exit/;
function commandInspection(text) {
    // cd
    if (text.match(cd) != null) {
        switch (text) {
            case "cd" :
                history.innerHTML += ("<br>" + "cd [path]");
                break;
            case "cd home":
                location.href = "/";
                break;
            case "cd..":
                location.href = "/";
                break;
            case "cd ..":
                location.href = "/";
                break;
            case "cd mypage":
                location.href = "mypage";
                break;
            case "cd login":
                location.href = "login";
                break;
            case "cd register":
                location.href = "register";
                break;
            case "cd help":
                location.href = "help";
                break;
            default:
                history.innerHTML += ("<br>" + "The specified path could not be found.");
        }

    // ls
    } else if (text.match(ls) != null) {
        history.innerHTML += ("<br>" + "help" + 
                                "<br>" + "home" +
                                "<br>" + "mypage" +
                                "<br>" + "login" +
                                "<br>" + "register");

    // echo
    } else if (text.match(echo) != null) {
        let echoText = text.substring(4);
        history.innerHTML += ("<br>" + echoText);
    
    // login
    } else if (text.match(login) != null) {
        let dividedLogin = text.split(" ");
        if (dividedLogin[2] == "-p" && dividedLogin.length == 4) {

            path = fetch(currentURL + "/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": dividedLogin[1],
                    "pw": dividedLogin[3]
                })
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJSON) {
                if (myJSON.success) {
                    history.innerHTML += ("<br>" + "Login success!");
                } else {
                    history.innerHTML += ("<br>" + "Login fail!");
                }
            })

        } else {
            history.innerHTML += ("<br>" + "The login statement is strange.");
        }
    
    
    
    // register
    // register asdf -p 1234 --email slimejam01@gmail.com --school 선린인터넷고등학교
    } else if (text.match(register) != null) {
        let dividedRegister = text.split(" ");
        if (dividedRegister[2] == "-p" && dividedRegister[4] == "--email" && dividedRegister[6] == "--school" && ((dividedRegister[8] == "-m") || (dividedRegister[8] == "-h")) && dividedRegister.length == 9) {

            if (!(dividedRegister[3].length < 8 || dividedRegister[3].length > 20) && !(dividedRegister[1].length < 5 || dividedRegister[1].length > 20)) {
                fetch(currentURL + "/register", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "id": dividedRegister[1],
                        "pw": dividedRegister[3],
                        "email": dividedRegister[5],
                        "school": dividedRegister[7],
                        "grade" : dividedRegister[8].substring(1)
                    })
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJSON) {
                    if (myJSON.success) {
                        history.innerHTML += ("<br>" + "Register success! Login and complete your email verification.");
                    } else {
                        history.innerHTML += ("<br>" + "Register fail!");
                    }
                })
            } else {
                history.innerHTML += ("<br>" + "Register fail! Your username or password is too short or long!");
            }

        } else {
            history.innerHTML += ("<br>" + "The register statement is strange.");
        }

    // auth
    } else if (text.match(auth) != null) {
        let dividedAuthKey = text.split(" ");
        if (dividedAuthKey.length == 2) {

            path = fetch(currentURL + "/auth", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "key": dividedAuthKey[1],
                })
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJSON) {
                switch (myJSON.success) {
                    case true:
                        history.innerHTML += ("<br>" + "Verification successful! Go back to home page");
                        break;
                    case "already":
                        history.innerHTML += ("<br>" + "You are already email certified");
                        break;
                    default:
                        history.innerHTML += ("<br>" + "Authentication failed. Please re-enter");
                }
            })
        } else {
            history.innerHTML += ("<br>" + "The auth statement is strange.");
        }

    // comment
    } else if (text.match(comment) != null) {
        let commentText = text.substring(8);

        // 코멘트 전달
        fetch(currentURL + "/mypage", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ment": commentText
            })
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJSON) {
            history.innerHTML += ("<br>" + myJSON.message);
        })

    // reverify
    } else if (text.match(reverify) != null) {
        let dividedReverify = text.split(" ");
        if (dividedReverify[1] == "--email" && dividedReverify.length == 3) {
            fetch(currentURL + "/auth", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": dividedReverify[2]
                })
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJSON) {
                if (myJSON.success) {
                    history.innerHTML += ("<br>" + "Successful reset of email and resend authentication key.");
                } else {
                    history.innerHTML += ("<br>" + "Email reset failed.");
                }
                
            })  
        } else {
            history.innerHTML += ("<br>" + "The reverify statement is strange.");
        }

    // exit
    } else if (text.match(exit) != null) {
        if (text == "exit") {
            location.href = "logout";
        }

    } else {
        history.innerHTML += ("<br>" + "It is an unintelligible command.");
    }
    
    
}