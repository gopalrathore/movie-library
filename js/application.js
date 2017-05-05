var app = angular.module('myApp', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider){
  
  $routeProvider
  .when('/signup',{
    resolve: {
      "check": function($location, $rootScope){
        if($rootScope.logged=="true"){
          $location.path('/movies');
        }
      }
    },
    templateUrl: 'view/signup.html',
    controller: 'regcontroller'
  })
  .when('/movies',{
    resolve: {
      "check": function($location, $rootScope){
        if($rootScope.logged=="false"){
          $location.path('/signup');
        }
      }
    },
    templateUrl: 'view/movies.html',
    controller: 'moviecontroller'
  }).otherwise({
    redirectTo: '/signup'
  });
  
}]);



app.controller('regcontroller', function($scope, $rootScope, $location) {
  if($rootScope.logged=="false"){
    $rootScope.master = {};
  }
  
  $scope.submit = function(register) {
    var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];
    var day = register.date.getDate();
    var monthIndex = register.date.getMonth();
    var year = register.date.getFullYear();
    $scope.register.date=day+"-"+monthNames[monthIndex]+"-"+year;
    console.log(register);
    $rootScope.logged="true";
    $rootScope.master = angular.copy(register);
    console.log(register);
    $location.path('/movies');
  };
});

app.controller('moviecontroller', function($scope, $http, $rootScope, $location) {
  
  $scope.search = function(){
    var title = $scope.searchtitle;
    if(title!="" || title=="undefined" || title=="undefined"){
      $http.get("http://www.omdbapi.com/?t="+title+"&y=&plot=short&r=json")
      .success(function(response){
        if(response.Response){
          $scope.movie=response;
        }
      }, function myError(response) {
        $scope.myWelcome = response.statusText;
      });
    }else{
      alert("enter a movie");
    }
    
  }
  
  $scope.logout = function() {
    $rootScope.logged="false";
    $location.path('/signup');
  };
  
  
});
