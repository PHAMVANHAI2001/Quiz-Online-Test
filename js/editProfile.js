app.controller("editProfileCtrl", ["$scope", "$rootScope", "$location", "$firebaseArray", "$firebaseAuth",
    function ($scope, $rootScope, $location, $firebaseArray, $firebaseAuth) {
        $rootScope.students;
        var arrInfo = $rootScope.students.email;

        console.log($rootScope.students);

        // $scope.students.forEach(st => {
        //     console.log(st.email);
        // });

        // if (isEmailExist == true) {

        // }

        $scope.fullname = $rootScope.currentUser.fullname;
        $scope.email = $rootScope.currentUser.email;
        $scope.birthday = $rootScope.currentUser.birthday;
        $scope.gender = $rootScope.currentUser.gender;
        $scope.editProfile = function () {
            var student = $rootScope.students.filter(st => st.username == $rootScope.currentUser.username)[0];
            if ($scope.fullname == null || $scope.email == null || $scope.birthday == null || $scope.gender == null) {
                Toast.fire({
                    icon: 'error',
                    title: 'Cập nhật thông tin thất bại!'
                });
            } else {
                refStudents.child(student.$id).update({
                    fullname: $scope.fullname,
                    email: $scope.email,
                    birthday: $scope.birthday,
                    gender: $scope.gender
                });

                $rootScope.currentUser.fullname = $scope.fullname;
                $rootScope.currentUser.email = $scope.email;
                $rootScope.currentUser.birthday = $scope.birthday;
                $rootScope.currentUser.gender = $scope.gender;

                localStorage.setItem("currentUser", JSON.stringify($rootScope.currentUser));

                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật thông tin thành công!'
                });
            }
        }
    }
]);