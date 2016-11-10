angular.module('finn', [])
	.controller('appController', ['$scope', '$http', function ($scope, $http) {
		var HOST = 'http://finn-rosson.rhcloud.com/';
		var DEBOUNCE_WAIT = 200;
		var latestQueryId;
		function _setResults(queryId, prop, data) {
			if (queryId === latestQueryId) {
				$scope[prop] = data;
			}
		}
		function _fetchData() {
			var query = $scope.query.trim();
			if (!query) { return; }
			var queryId = Number(new Date());
			latestQueryId = queryId;
			$http.get(HOST + 'sana/' + query)
				.success(function(data) {
					_setResults(queryId, 'sanat', data);
				});
			$http.get(HOST + 'full/' + query)
				.success(function(data) {
				  _setResults(queryId, 'quotes', data);
				});
			window.ga('send', 'event', 'Query', 'Entered', query);
		}
		$scope.update = window.debounce(_fetchData, DEBOUNCE_WAIT);
  }]);

