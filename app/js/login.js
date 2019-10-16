var login_data = {
    id: 'admin',
    password: 1234
}

$(function() {
    $("#login_status").hide();
    // sessionStorage.setItem("Token", "1");
    // location.replace("/")

    $("#click_login").on("click", async function() {
        wirteHouseItem('qqqq', 'test', 'test@gmail.com', 'qweqwe');
        var id_value = $("#id_val").val();
        var pw_value = $("#pw_val").val();
        // test id : test@gmail.com
        // test pw : testtt
        console.log('emailLogin result', await emailLogin(id_value, pw_value));

        if(login_data.id == id_value && login_data.password == pw_value) {
        // if(true) {
            sessionStorage.setItem("Token", "1");
            location.replace("/")
        } else {
            $("#login_status").show();
        }
    })
})