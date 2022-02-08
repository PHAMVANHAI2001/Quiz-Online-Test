app.controller("changePassCtrl", ["$scope", "$rootScope", "$location", "$firebaseArray", "$firebaseAuth",
  function ($scope, $rootScope, $location, $firebaseArray, $firebaseAuth) {
    var refStudents = firebase.database().ref("student");
    $scope.changePass = function () {
      var student = $rootScope.students.filter(st => st.username == $rootScope.currentUser.username)[0];
      if ($scope.oldPass != $rootScope.currentUser.password) {
        Toast.fire({
          icon: 'error',
          title: 'Mật khẩu cũ không đúng!'
        });
      } else {
        if ($scope.newPass == $scope.oldPass) {
          Toast.fire({
            icon: 'error',
            title: 'Mật khẩu mới không được giống với mk cũ!'
          });
        } else {
          if ($scope.cfmNewPass != $scope.newPass) {
            Toast.fire({
              icon: 'error',
              title: 'Mật khẩu xác nhận không đúng!'
            });
          } else {
            refStudents.child(student.$id).update({
              password: $scope.newPass
            });

            $rootScope.currentUser.password = $scope.newPass;
            localStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));

            Toast.fire({
              icon: 'success',
              title: 'Đổi Mật Khẩu Thành Công!'
            });

            setTimeout(() => {
              $location.path("/");
              $scope.$apply();
            }, 3000);
          }
        }
      }
    }
  }
]);