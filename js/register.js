app.controller("regCtrl", ["$scope", "$rootScope", "$location", "$firebaseArray", "$firebaseAuth",
    function ($scope, $rootScope, $location, $firebaseArray, $firebaseAuth) {
        $rootScope.students;
        $scope.addUser = function () {
            var isUsernameExist = false;
            var isEmailExist = false;

            $rootScope.students.forEach(st => {
                if (st.username == $scope.username) {
                    isUsernameExist = true;
                } else if (st.email == $scope.email) {
                    isEmailExist = true;
                } else {
                    isUsernameExist = false;
                    isEmailExist = false;
                }
            });

            if (isUsernameExist == true) {
                Toast.fire({
                    icon: 'error',
                    title: 'Tên đang nhập đã tồn tại!'
                });
                return;
            }

            if (isEmailExist == true) {
                Toast.fire({
                    icon: 'error',
                    title: 'Email đã tồn tại!'
                });
                return;
            }

            if ($scope.birthday == null || $scope.email == null || $scope.fullname == null || $scope.gender == null || $scope.password == null || $scope.username == null) {
                Toast.fire({
                    icon: 'error',
                    title: 'Đăng ký thất bại!'
                });
            } else {
                $scope.birthday = moment($scope.birthday).format('DD/MM/YYYY');
                $rootScope.students.$add({
                    birthday: $scope.birthday,
                    email: $scope.email,
                    fullname: $scope.fullname,
                    gender: $scope.gender,
                    password: $scope.password,
                    username: $scope.username
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Đăng ký thành công!'
                });

                setTimeout(() => {
                    $location.path("/");
                    $scope.$apply();
                }, 3000);
            }
        }
    }
]);