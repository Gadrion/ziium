var login_data = {
    id: 'admin',
    password: 1234
}

$(function() {
    $("#login_status").hide();

    $("#click_login").on("click", function() {
        var id_value = $("#id_val").val();
        var pw_value = $("#pw_val").val();

        if(login_data.id == id_value && login_data.password == pw_value) {
            sessionStorage.setItem("Token", "1");
            location.replace("/")
        } else {
            $("#login_status").show();
        }
    })
})