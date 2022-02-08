app.controller("lgCtrl", ["$scope", "$rootScope", "$location", "$firebaseArray", "$firebaseAuth",
    function ($scope, $rootScope, $location, $firebaseArray, $firebaseAuth) {
        $scope.mainLogin = function () {
            var isUsername = false;
            var isPassword = false;
            $rootScope.currentUser;

            $rootScope.students.forEach(st => {
                if (st.username == $scope.usernameLG || st.email == $scope.usernameLG) {
                    isUsername = true;
                    if (st.password == $scope.passwordLG) {
                        $rootScope.currentUser = st;
                        isPassword = true;
                    }
                }
            });

            if (isUsername == false) {
                Toast.fire({
                    icon: 'error',
                    title: 'Tên đang nhập không đúng!'
                });
                return;
            }

            if (isPassword == false) {
                Toast.fire({
                    icon: 'error',
                    title: 'Mật khẩu không đúng!'
                });
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
            $location.path("/");
            Toast.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!'
            });
        }

        $scope.ggLogin = function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth()
                .signInWithPopup(provider)
                .then((result) => {
                    var user = result.user;
                    var id = user.uid;
                    var email = user.email;
                    var fullname = user.displayName;
                    var username = email.substring(0, result.user.email.indexOf('@'));
                    var isUsernameExist = false;
                    var isEmailExist = false;


                    $rootScope.currentUser = {
                        "username": username,
                        "fullname": fullname,
                        "email": email
                    };

                    localStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
                    $location.path('/');
                    $scope.$apply();
                    Toast.fire({
                        icon: 'success',
                        title: 'Đăng nhập thành công!'
                    });

                    $rootScope.students.forEach(st => {
                        if (st.username == username || st.email == email) {
                            isUsernameExist = true;
                            isEmailExist = true;
                        }
                    });

                    if (isUsernameExist == true || isEmailExist == true) {
                        console.log("fail");
                        return;
                    } else if (isUsernameExist == false && isEmailExist == false) {
                        $rootScope.students.$add({
                            birthday: "01/01/1990",
                            email: email,
                            fullname: fullname,
                            gender: "true",
                            password: "123456",
                            username: username
                        });
                    }
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                });
        };
    }
]);