app.controller("detailsAnswersCtrl",
    function ($scope, $rootScope, $firebaseArray, $routeParams) {
        var refDetailsofExam = firebase.database().ref("historyExam").child($rootScope.currentUser.username).child($routeParams.idMH).child($routeParams.idListQuestions);
        // var refListQuestions = refDetailsofExam.child('listQuestions');
        $scope.detailsOfExam = $firebaseArray(refDetailsofExam);
        $scope.detailsOfExam.$loaded().then(function () {
            $scope.listQuestions = JSON.parse($scope.detailsOfExam.$getRecord('listQuestions').$value);
            $scope.listAnswers = JSON.parse($scope.detailsOfExam.$getRecord('listAnswers').$value);
            console.log($scope.listAnswers);
            console.log($scope.listQuestions);
            var isChecked = false;
            for (let i = 0; i < $scope.listQuestions.length; i++) {
                for (let j = 0; j < $scope.listAnswers.length; j++) {
                    if ($scope.listQuestions[i].Id == $scope.listAnswers[j].questionId) {
                        $scope.listQuestions[i].userAnswer = $scope.listAnswers[j].answerId;
                    }
                }
            }
            console.log($scope.listQuestions);
        })
    }
);