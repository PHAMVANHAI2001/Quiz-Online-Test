app.controller("quizCtrl", ["$scope", "$rootScope", "$firebaseArray", "$routeParams", "$interval", "$location", function ($scope, $rootScope, $firebaseArray, $routeParams, $interval, $location) {
    $scope.pageSize = 1;
    $scope.start = 0;
    $scope.stt = 1;
    $scope.tenMH = $routeParams.tenMH;
    $scope.idMH = $routeParams.idMH;
    $scope.listAnswersOfUser = [];

    var today = new Date();
    // var refQuizzes = firebase.database().ref("quiz");
    var quizzes = $firebaseArray(firebase.database().ref("quiz").child($routeParams.idMH));
    var refHistoryExam = firebase.database().ref("historyExam");
    $scope.historyExam = $firebaseArray(refHistoryExam);
    var refHistoryExamUser = refHistoryExam.child($rootScope.currentUser.username).child($scope.idMH);
    $scope.historyExamUser = $firebaseArray(refHistoryExamUser);
    $scope.listQuestions = [];
    var historyExamInComplete = [];
    $scope.countDown = 900;
    var isFinish = false;

    // load tất cả dữ liệu có trong quizzes
    quizzes.$loaded().then(function (dataQuiz) {
        // Thời gian thi
        var stop = $interval(function () {
            if ($scope.countDown > 0) {
                $scope.countDown -= 1;
            }
            refHistoryExamUser.child(historyExamInComplete.$id).update({
                "countDown": $scope.countDown,
            });

            if ($scope.countDown == 0) {
                $interval.cancel(stop);
                Toast.fire({
                    icon: 'success',
                    title: 'Đã hết thời gian làm bài!'
                });

                refHistoryExamUser.child(historyExamInComplete.$id).update({
                    'countDown': $scope.countDown,
                    'status': 'complete'
                });

                setTimeout(() => {
                    $location.path("/answer");
                    $scope.$apply();
                }, 3000);
            }
            if ($location.path() != "/tracnghiem") {
                $interval.cancel(stop);
            }
        }, 1000)

        // Random mảng câu hỏi
        shuffleArray(dataQuiz);
        // Lấy ra 10 câu hỏi
        for (var i = 0; i < 10; i++) {
            $scope.listQuestions.push(dataQuiz[i]);
        }

        // console.log($scope.historyExamUser);
        if ($scope.historyExamUser.length == 0) {
            refHistoryExamUser.child(today.getTime()).update({
                "listQuestions": JSON.stringify($scope.listQuestions),
                "status": "incomplete",
                "totalQuestionsDone": 0,
                "totalQuestions": $scope.listQuestions.length,
                "mark": 0,
                "countDown": 900,
                'workday': moment(today).format('DD/MM/YYYY'),
            }).then(function () {
                historyExamInComplete = $scope.historyExamUser.find(hs => hs.status == "incomplete");
            })
        } else {
            $scope.historyExamUser.forEach(hs => {
                if (hs.status == "incomplete") {
                    $scope.listQuestions = JSON.parse(hs.listQuestions);
                    historyExamInComplete = hs;
                    $scope.countDown = hs.countDown;
                    if (hs.listAnswers != undefined) {
                        $scope.listAnswersOfUser = JSON.parse(hs.listAnswers);
                    }
                } else {
                    refHistoryExamUser.child(today.getTime()).update({
                        "listQuestions": JSON.stringify($scope.listQuestions),
                        "status": "incomplete",
                        "totalQuestionsDone": 0,
                        "totalQuestions": $scope.listQuestions.length,
                        "mark": 0,
                        "countDown": 900,
                        'workday': moment(today).format('DD/MM/YYYY'),
                    }).then(function () {
                        historyExamInComplete = $scope.historyExamUser.find(hs => hs.status == "incomplete");
                    });
                }
            });
        }
    });

    $scope.checkAnswer = function (stt, questionId, currentAnswerId, answerId, marks) {
        $scope.listAnswersOfUser[stt - 1] = {
            "questionId": questionId,
            "answerId": answerId,
            "mark": currentAnswerId == answerId ? marks : 0,
        };

        var mark = 0;
        var totalQuestionsDone = 0;
        for (let i = 0; i < $scope.listAnswersOfUser.length; i++) {
            console.log($scope.listAnswersOfUser[1]);
            if ($scope.listAnswersOfUser[i] != null) {
                mark += $scope.listAnswersOfUser[i].mark;
                totalQuestionsDone++;
            }
        }
        console.log(mark);

        refHistoryExamUser.child(historyExamInComplete.$id).update({
            'mark': mark,
            'totalQuestionsDone': totalQuestionsDone
        });

        refHistoryExamUser.child(historyExamInComplete.$id).child('listAnswers').set(JSON.stringify($scope.listAnswersOfUser));
    }

    $scope.finish = function () {
        isFinish = true;
        Swal.fire({
            title: 'Are you sure?',
            text: "Bạn có chắc là muốn nộp bài không?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Không',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có',
            confirmButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                // $interval.cancel(stop);
                Swal.fire(
                    'Success!',
                    'Nộp Bài Thành Công!',
                    'success'
                )
                refHistoryExamUser.child(historyExamInComplete.$id).update({
                    'countDown': $scope.countDown,
                    'status': 'complete'
                });

                $location.path("/answer");
                $scope.$apply();
            }
        })
    }

    $scope.prev = function () {
        if ($scope.start > 0) {
            $scope.start -= $scope.pageSize;
            $scope.stt -= $scope.pageSize;
        }
    }

    $scope.next = function () {
        if ($scope.start < $scope.listQuestions.length - $scope.pageSize) {
            $scope.start += $scope.pageSize;
            $scope.stt += $scope.pageSize;
        }
    }
}]);