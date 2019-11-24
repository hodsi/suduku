const AuthonticatedLogins = {
    user17: "1234",
};

function checkLogin()
{
    const userName = document.getElementsByClassName("userName")[0].value;
    const password = document.getElementsByClassName("password")[0].value;
    return AuthonticatedLogins.hasOwnProperty(userName) && AuthonticatedLogins[userName] === password;
}