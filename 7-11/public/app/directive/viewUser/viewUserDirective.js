/*
* @auther : Arun lalithambaran
* @Description : Main app script for Angular Registration Form
*/
(() => {
    angular.module('adminPanel')
    .directive('viewUserDirective', ['ipcMain', function(ipcMain) {
        return {
            link : link,
            templateUrl : 'app/directive/viewUser/viewUserTemplate.html'
        };
        function link(scope,element, attr) {
            scope.user = ipcMain.get('user');
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

