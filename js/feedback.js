app.controller("feedbackCtrl", ["$scope", "$rootScope", "$location", "$firebaseArray", "$firebaseAuth",
    function ($scope, $rootScope, $location, $firebaseArray, $firebaseAuth) {
        var refStudents = firebase.database().ref("student");
        // $scope.sendFeedback = function (receiver) {
        //     Email.send({
        //         Host: "smtp.gmail.com",
        //         Username: "haipvps14680@fpt.edu.vn",
        //         Password: "woxuqylnkudzxflt",
        //         To: receiver,
        //         From: "OnlineTraining@fpt.edu.vn",
        //         Subject: "Reset Password",
        //         Body: "Chào: " + "<b> " + receiver + "</b>" + "<br>Đây là mật khẩu mới của bạn: " + "<b>" + password + "</b>"
        //     });
        // }
    }
]);