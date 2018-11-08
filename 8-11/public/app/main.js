/*
* @auther : Ajeesh K George
* @Description : Main app script for Angular Registration Form
*/
(() => {
    angular.module('angForm', ['ngRoute'])
        .controller('appCntr', function($scope, $location, authenticate, $rootScope) {
            $scope.isLogged = authenticate.isLogged();
            $scope.logout = function() {
                authenticate.logout();
                $scope.isLogged = false;
                $location.path('/login');
            }
            $rootScope.$on('login', function() {
                $scope.isLogged = true;
            });
    })
    .run(['$rootScope', '$location', 'authenticate', function($rootScope, $location, authenticate) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            if(!nextRoute.permission) {
                if(!authenticate.isLogged()) {
                    $location.path('/login');
                }
            }else if(authenticate.isLogged() && nextRoute.$$route.originalPath === '/login') {
                $location.path('/userhome');
            }
        });
    }])
    .factory('dataPass', function() {
        let data = {};
        return {
            get : get,
            set : set
        }
        function get(key) {
            try {
                return data[key];
            } finally {
                data = {};
            }
        }
        function set(key, value) {
            data[key] = value;
        }
    });
    
})();
