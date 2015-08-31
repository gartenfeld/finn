angular.module('myApp', [])
	.controller('MyController', ['$scope', '$http', function ($scope, $http) {
		var host = 'http://finn-rosson.rhcloud.com/';
		$scope.updateQuery = function () {
			if ($scope.query.trim() !== "") {
	      $http.get(host + 'sana/' + $scope.query)
	       	.success(function (data) {
						$scope.sanat = data;
	  			});
	  		$http.get(host + 'full/' + $scope.query)
	  			.success(function(data) {
	    			$scope.quotes = data;
	  			});
  		}
    };
}]);

