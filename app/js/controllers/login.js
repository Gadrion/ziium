kindFramework.controller("LoginCtrl", function($scope, $location) {
    $scope.id_val = "";
    $scope.pw_val = "";
    $scope.login_status = "";

    var login_data = {
        id: 'admin',
        password: 1234
    }

    $scope.clickLogin = function () {
        if(login_data.id == $scope.id_val && login_data.password == $scope.pw_val) {
            $location.path('/map');
        } else {
            $scope.login_status = "입력정보가 일치하지 않습니다.";
        }
    }

    // $("#login_status").hide();

    // $("#click_login").on("click", function() {
    //     if(login_data.id == $scope.id_value && login_data.password == $scope.pw_value) {
    //         // sessionStorage.setItem("Token", "1");
    //         $location.path('/map');
    //     } else {
    //         $("#login_status").show();
    //     }
    // })
})