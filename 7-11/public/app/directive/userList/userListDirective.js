/*
* @auther : Arun lalithambaran
* @Description : Main app script for Angular Registration Form
*/
(() => {
    angular.module('adminPanel')
    .directive('userListDirective', ['getUserFactory', 'registerUserFactory', 'ipcMain', '$location', function(getUserFactory, registerUserFactory, ipcMain, $location) {
        return {
            link : link,
            templateUrl: 'app/directive/userList/userListTemplate.html'
        }
        function link(scope, element, attr) {
            scope.userList = getUserFactory.get();
            scope.removeUser = function(id) {
                scope.userList.splice(id, 1);
                registerUserFactory.save(scope.userList);
            }
            scope.updateUser = function(id) {
                ipcMain.set('user', {userList : scope.userList, id : id});
                $location.path('/adduser');
            }
            scope.viewUser = function(id) {
                ipcMain.set('user', scope.userList[id]);
                $location.path('/viewuser');
            }
        }
    }]);
})();

    