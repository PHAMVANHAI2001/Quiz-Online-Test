app.controller("forgotPassCtrl", ["$scope", "$rootScope", "$location", "$firebaseArray", "$firebaseAuth",
    function ($scope, $rootScope, $location, $firebaseArray, $firebaseAuth) {
        var refStudents = firebase.database().ref("student");
        $scope.forgotPassword = function (receiver) {
            var student = $rootScope.students.filter(st => st.email == receiver)[0];
            var password = generatePassword(8);
            if (!student) {
                Toast.fire({
                    icon: 'error',
                    title: 'Email không tồn tại!'
                });
                return;
            } else {
                refStudents.child(student.$id).update({
                    password: password
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Mật khẩu mới đã được gửi về email của bạn!'
                });
                setTimeout(() => {
                    $location.path("/");
                    $scope.$apply();
                }, 3000);
            }

            Email.send({
                Host: "smtp.gmail.com",
                Username: "haipvps14680@fpt.edu.vn",
                Password: "woxuqylnkudzxflt",
                To: receiver,
                From: "OnlineTraining@fpt.edu.vn",
                Subject: "Reset Password",
                Body: "Chào: " + "<b> " + receiver + "</b>" + "<br>Đây là mật khẩu mới của bạn: " + "<b>" + password + "</b>"
            });
        }
    }
]);