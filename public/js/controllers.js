var myApp = angular.module('myApp', []);

myApp.controller('MyController', ['$scope', '$http', function($scope, $http) {

	$scope.updateQuery= function() {
        $http.get('http://finn-rosson.rhcloud.com:8080/sana/' + $scope.query).success(function(data) {
			$scope.sanat = data;
  			});
  		$http.get('http://finn-rosson.rhcloud.com:8080/full/' + $scope.query).success(function(data) {
    		$scope.quotes = data;
  			});
    };

}]);

