const AuthonticatedLogins = {
    user17: "1234",
};

function checkLogin(event)
{
    const userName = event.target.userName.value;
    const password = event.target.password.value;
    if (AuthonticatedLogins[userName] !== password) {
        event.preventDefault();
    }
}
