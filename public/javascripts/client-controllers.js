/**
 * Created by chanwook on 2014. 7. 5..
 */
/* Angular Controller */

var redisViewApp = angular.module('redisViewApp', []);

function mainController($scope, $http) {
    $scope.search = function () {
        var criteria = $scope.criteria;
        if(!criteria || 0 === criteria.length) {
            criteria = '*';
        }

        $http.get('/redis/keys/?criteria=' + criteria)
            .success(function (data) {
                $scope.keys = data;
                console.log(">> 조회 Key 목록: " + keys);
            })
            .error(errorSupport());
    }

    $scope.getCacheList = function(key) {
        $http.get('/redis/caches/' + key)
            .success(function (data) {
                $scope.caches = data;
                console.log(">> Cache 조회 결과(key=" + key +"): " + data );
            })
            .error(errorSupport());
    }

    $scope.cacheClear = function (key) {
        $http.delete('/redis/caches/' + key)
            .success(function (data) {
                console.log(">> Cache 삭제 결과(key: " + key+"): " + data);
            })
            .error(errorSupport());
    }
}

function errorSupport(data){
    console.log(">> Error : " + data);
}