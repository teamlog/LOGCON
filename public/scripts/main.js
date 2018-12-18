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
         .replace(/"/g, "")
         .replace(/'/g, "");
}

let cd = /^cd/;
let ls = /^ls$/;
let echo = /^echo\s/;
let login = /^login\s/;
let register = /^register\s/;
let auth = /^auth\s/;
let solve = /^solve\s/; // answer
let comment = /^comment\s/;
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
            case "cd challenges":
                location.href = "challenges";
                break;
            case "cd challenge":
                location.href = "challenges";
                break;
            case "cd notice":
                location.href = "notice";
                break;
            case "cd rank":
                location.href = "rank";
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
            default:
                history.innerHTML += ("<br>" + "The specified path could not be found.");
                // location.href = "404";
        }

    // ls
    } else if (text.match(ls) != null) {
        history.innerHTML += ("<br>" + "home" + 
                                "<br>" + "challenges" + 
                                "<br>" + "notice" + 
                                "<br>" + "rank" + 
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

            path = fetch("http://localhost:4000/login", {
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

            })

        } else {
            history.innerHTML += ("<br>" + "The login statement is strange.");
        }
    
    
    
    // register
    // register asdf -p 1234 --email slimejam01@gmail.com --school 선린인터넷고등학교
    } else if (text.match(register) != null) {
        let dividedRegister = text.split(" ");
        if (dividedRegister[2] == "-p" && dividedRegister[4] == "--email" && dividedRegister[6] == "--school" && dividedRegister.length == 8) {

            fetch("http://localhost:4000/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": dividedRegister[1],
                    "pw": dividedRegister[3],
                    "email": dividedRegister[5],
                    "school": dividedRegister[7]
                })
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJSON) {

            })

        } else {
            history.innerHTML += ("<br>" + "The register statement is strange.");
        }

    // auth
    } else if (text.match(auth) != null) {
        let dividedAuthKey = text.split(" ");
        if (dividedAuthKey.length == 2) {

            path = fetch("http://localhost:4000/auth", {
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

            })
        } else {
            history.innerHTML += ("<br>" + "The auth statement is strange.");
        }

    // solve (answer)
    // solve --id=1 --answer=이것은답이다
    // sovle -i=1 -a=이것은답이다
    } else if (text.match(solve) != null) {
        let dividedSolve = text.split(" ");
        let id, answer;
        if ((dividedSolve[1].match(/^--id\=|-i\=/) != null) && (dividedSolve[2].match(/^--answer\=|^-a\=/)) && (dividedSolve.length == 3)) {

            // id 검사
            if (dividedSolve[1].match(/^--id\=/) != null) {
                id = dividedSolve[1].substring(5);
            } else if (dividedSolve[1].match(/^-i\=/) != null) {
                id = dividedSolve[1].substring(3);
            } else {
                history.innerHTML += ("<br>" + "id syntax is strange.");
            }

            // answer 검사
            if (dividedSolve[2].match(/^--answer\=/) != null) {
                answer = dividedSolve[2].substring(9);
            } else if (dividedSolve[2].match(/^-a\=/) != null) {
                answer = dividedSolve[2].substring(3);
            } else {
                history.innerHTML += ("<br>" + "answer syntax is strange.");
            }

            // 답 전달
            fetch("http://localhost:4000/challenge/" +pid, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "answer": answer
                })
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJSON) {

            })

        // comment
        } else if (text.match(comment) != null) {
            let commentText = text.substring(8);

            // 코멘트 전달
            fetch("http://localhost:4000/mypage", {
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

            })

        } else {
            history.innerHTML += ("<br>" + "The solve statement is strange.");
        }
    }
    
    
}