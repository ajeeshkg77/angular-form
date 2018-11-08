/*
* @auther : Ajeesh K George
* @Description : Main app script for Angular Registration Form
*/
(() => {
    angular.module('angForm')
    .directive('loginDirective', ['authenticate', '$location', '$rootScope' , function(authenticate, $location, $rootScope) {
        return {
            link: link,
            templateUrl: 'app/directive/login/loginTemplate.html'
        }
        function link(scope, element, attr) {
            scope.login = {
                username: '',
                password: ''
            }
            scope.loginErr = false;
            scope.auth = function() {
                if(authenticate.login(scope.login)) {
                    $rootScope.$broadcast('login');
                    $location.path('/userhome');
                } else {
                    scope.loginErr = true;
                    alert("Invalid login information..");
                   scope.login = {
                username: '',
                password: ''
            }
                }
            }
        }
    }])
    .factory('authenticate', function() {
        return {
            login: function(login) {
                if(login.username === 'admin' && login.password === 'pass') {
                    let uid = Math.floor((Math.random() * 100000000) + 1);
                    sessionStorage.setItem('userInfo', JSON.stringify({id: uid, name: login.username}));
                    return true;
                } else {
                    return false;
                }
            },
            isLogged: function() {
                return sessionStorage.getItem('userInfo')?true:false;
            },
            logout: function() {
                sessionStorage.clear('userInfo');
            }
        }
    });
})();


