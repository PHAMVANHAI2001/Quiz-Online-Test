const firebaseConfig = {
    apiKey: "AIzaSyCv0B0SySUW3LtjCg6kg3XKsuUKxE1n8Xc",
    authDomain: "db-web207.firebaseapp.com",
    databaseURL: "https://db-web207-default-rtdb.firebaseio.com",
    projectId: "db-web207",
    storageBucket: "db-web207.appspot.com",
    messagingSenderId: "69609424178",
    appId: "1:69609424178:web:111ceccc63797570b6032b"
};

firebase.initializeApp(firebaseConfig);

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function generatePassword(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



var app = angular.module("myApp", ["ngRoute", "firebase"]);

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

app.controller("homeCtrl", ["$scope", "$rootScope", "$location", "$firebaseArray", "$firebaseAuth", function ($scope, $rootScope, $location, $firebaseArray, $firebaseAuth) {
    $scope.pageSize = 4;
    $scope.start = 0;
    $rootScope.currentUser = [];

    var ref = firebase.database().ref();

    var refCacmonhoc = ref.child("subject");
    $scope.cacmonhoc = $firebaseArray(refCacmonhoc);

    var refStudents = ref.child("student");
    $rootScope.students = $firebaseArray(refStudents);

    var refQuizzes = ref.child("quiz");
    $rootScope.quizzes = $firebaseArray(refQuizzes);

    $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    $scope.logOut = function () {
        $rootScope.currentUser = null;
        localStorage.removeItem('currentUser');
        Toast.fire({
            icon: 'success',
            title: 'Đăng xuất thành công!'
        })
    }

    $scope.first = function () {
        $scope.start = 0;
    }

    $scope.prev = function () {
        if ($scope.start > 0) {
            $scope.start -= $scope.pageSize;
        }
    }

    $scope.next = function () {
        if ($scope.start < $scope.cacmonhoc.length - $scope.pageSize) {
            $scope.start += $scope.pageSize;
        }
    }

    $scope.last = function () {
        var sotrang = Math.ceil($scope.cacmonhoc.length / $scope.pageSize);
        $scope.start = (sotrang - 1) * $scope.pageSize;
    }
}]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/about", {
            templateUrl: "about.html"
        })
        .when("/contact", {
            templateUrl: "contact.html"
        })
        .when("/feedback", {
            templateUrl: "feedback.html",
            controller: "feedbackCtrl"
        })
        .when("/QandA", {
            templateUrl: "QandA.html",
            controller: "qandaCtrl"
        })
        .when("/login", {
            templateUrl: "login.html",
            controller: "lgCtrl"
        })
        .when("/register", {
            templateUrl: "register.html",
            controller: "regCtrl"
        })
        .when("/forgotpass", {
            templateUrl: "forgotpass.html",
            controller: "forgotPassCtrl"
        })
        .when("/changepass", {
            templateUrl: "changepass.html",
            controller: "changePassCtrl"
        })
        .when("/editprofile", {
            templateUrl: "editprofile.html",
            controller: "editProfileCtrl"
        })
        .when("/tracnghiem", {
            templateUrl: "tracnghiem.html",
            controller: "quizCtrl"
        })
        .when("/answer", {
            templateUrl: "answer.html",
            controller: "answerCtrl"
        })
        .when("/detailsanswers", {
            templateUrl: "detailsanswers.html",
            controller: "detailsAnswersCtrl"
        })
        .otherwise({
            templateUrl: "home.html"
        })
});