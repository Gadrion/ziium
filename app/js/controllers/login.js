kindFramework.controller("LoginCtrl", function($scope, $location, $timeout, FirebaseService) {
    // test@gmail.com
    // 123456

    $scope.id_val = "";
    $scope.pw_val = "";
    $scope.login_status = "";

    var login_data = {
        id: 'admin',
        password: 1234
    }

    $scope.clickLogin = function () {
        FirebaseService.login($scope.id_val, $scope.pw_val, function(response) {
            console.log(response);
            var sessionData = {};

            sessionData.refreshToken = response.user.refreshToken;
            sessionData.email = response.user.email;

            var SessionToString = JSON.stringify(sessionData);
            sessionStorage.setItem('Login', SessionToString);

            $location.path('/map')
        }, function(error) {
            if(error.code === 'auth/wrong-password') {
                $scope.login_status = "비밀번호 오류";
            } else if(error.code === 'auth/wrong-password') {
                $scope.login_status = "계정 오류";
            } else if(error.code === 'auth/invalid-email') {
                $scope.login_status = "이메일 형식이 아닙니다.";
            } else {
                $scope.login_status = error.code
            }
        });
    }
})