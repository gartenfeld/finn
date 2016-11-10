angular.module('finn', [])
	.controller('appController', ['$scope', '$http', function ($scope, $http) {
		var HOST = 'http://finn-rosson.rhcloud.com/';
		var DEBOUNCE_WAIT = 200;
		function _fetchData() {
			var query = $scope.query.trim();
			if (!query) { return; }
			$http.get(HOST + 'sana/' + query)
				.success(function(data) {
					$scope.sanat = data;
				});
			$http.get(HOST + 'full/' + query)
				.success(function(data) {
				  $scope.quotes = data;
				});
		}
		$scope.update = window.debounce(_fetchData, DEBOUNCE_WAIT);
  }]);

