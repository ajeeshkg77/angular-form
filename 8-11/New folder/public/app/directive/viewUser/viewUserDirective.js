/*
* @auther : Ajeesh K George
* @Description : Main app script for Angular Registration Form
*/
(() => {
    angular.module('angForm')
    .directive('viewUserDirective', ['dataPass', function(dataPass) {
        return {
            link : link,
            templateUrl : 'app/directive/viewUser/viewUserTemplate.html'
        };
        function link(scope,element, attr) {
            scope.user = dataPass.get('user');
        }
    }])
    .factory('getUserFactory', function() {
        return {
            get: function() {
                let userList = JSON.parse(localStorage.getItem('server'));
                if(userList) {
                    return userList;
                } else {
                    return [];
                }
            }
        }
    });
})();

