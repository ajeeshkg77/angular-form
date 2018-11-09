/*
* @auther : Ajeesh K George
* @Description : Main app script for Angular Registration Form
*/
(() => {
    angular.module('angForm')
    .directive('userListDirective', ['getUserFactory', 'registerUserFactory', 'dataPass', '$location', function(getUserFactory, registerUserFactory, dataPass, $location) {
        return {
            link : link,
            templateUrl: 'app/directive/userTable/userListTemplate.html'
        }
        function link(scope, element, attr) {
            scope.userList = getUserFactory.get();
            scope.removeUser = function(id) {
                scope.userList.splice(id, 1);
                registerUserFactory.save(scope.userList);
            }
            scope.updateUser = function(id) {
                dataPass.set('user', {userList : scope.userList, id : id});
                $location.path('/adduser');
            }
            scope.viewUser = function(id) {
                dataPass.set('user', scope.userList[id]);
                $location.path('/viewuser');
            }
        }
    }]);
})();

    