app.controller("answerCtrl",
    function ($scope, $rootScope, $location, $firebaseArray, $firebaseAuth, $routeParams) {
        var refHistoryExamUser = firebase.database().ref("historyExam").child($rootScope.currentUser.username).child($routeParams.idMH);
        $scope.listAnswers = $firebaseArray(refHistoryExamUser);
        $scope.tenMH = $routeParams.tenMH;
        $scope.idMH = $routeParams.idMH;
    }
);