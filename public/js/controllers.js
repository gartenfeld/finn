angular.module('finn', [])
  .controller('appController', ['$scope', '$http', function ($scope, $http) {
    var HOST = 'https://suom.herokuapp.com/';
    var DEBOUNCE_WAIT = 400;
    var logQuery = window.debounce(function _logQuery(query) {
      window.ga('send', 'event', 'Query', 'Entered', query);
    }, DEBOUNCE_WAIT * 5);
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
      $http.get(HOST + 'word/' + query)
        .success(function(data) {
          _setResults(queryId, 'sanat', data);
        });
      $http.get(HOST + 'text/' + query)
        .success(function(data) {
          _setResults(queryId, 'quotes', data);
        });
      logQuery(query);
    }
    $scope.update = window.debounce(_fetchData, DEBOUNCE_WAIT);
  }]);

