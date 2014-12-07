var myApp = angular.module('myApp', []);

myApp.controller('MyController', ['$scope', '$http', function($scope, $http) {

	$scope.updateQuery= function() {
        $http.get('http://localhost:3000/sana/' + $scope.query).success(function(data) {
			$scope.sanat = data;
  			});
  		$http.get('http://localhost:3000/full/' + $scope.query).success(function(data) {
    		$scope.quotes = data;
  			});
    };

}]);

