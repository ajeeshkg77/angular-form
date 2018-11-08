/*
* @auther : Ajeesh K George
* @Description : Main app script for Angular Registration Form
*/
(()=> {
    angular.module('angForm')
    .directive('registerDirective', ['registerUserFactory', 'getUserFactory', 'dataPass', '$location', function(registerUserFactory, getUserFactory, dataPass, $location) {
        return {
            link: link,
            templateUrl: 'app/directive/register/addUserTemplate.html'
        }
        function link(scope, element, attr) {
            let editUser;
            function init() {







        //                 $scope.ph_numbr = /^\+?\d{10}$/;
        // $scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        // $scope.name_add = /^[a-z]+/i;
        // $scope.pass_add = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-+]).{6,20})/;
        // $scope.pin_add =   /^[0-9]{6}$/;



        
                editUser = dataPass.get('user');
                if(editUser) {
                    scope.userList = editUser.userList;
                    scope.user = editUser.userList[editUser.id];
                    scope.buttonText = 'Update User';
                } else {
                    scope.userList = getUserFactory.get();
                    scope.user = {
                        name: '',
                        email: '',
                        password: '',
                        phone: '',
                        address: '',
                        city: '',
                        state: '',
                        pin: ''
                    }
                    scope.buttonText = 'Add User';
                }
            }
            init();
            scope.addUser = function(status = false) {
                if(!editUser) scope.userList.push(scope.user);
                if(registerUserFactory.save(scope.userList)) {
                    init();
                    if(status === true) {
                        $location.path('/userhome');
                    }
                }
            }
        }
    }])
    .factory('registerUserFactory', ['getUserFactory', function(getUserFactory) {
        let userList = getUserFactory.get();
        return {
            save: function(user) {
                if(Array.isArray(user)) {
                    userList = user;
                } else {
                    userList.push(user);
                }
                localStorage.setItem('server', JSON.stringify(userList));
                return true;
            }
        }
    }]);
})();
