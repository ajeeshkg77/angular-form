/*
* @auther : Arun lalithambaran
* @Description : Main app script for Angular Registration Form
*/
(() => {
    let app = angular.module('adminPanel', ['ngRoute']);
    app.controller('mainContr', function($scope) {
        $scope.greetings = 'Hello World!';
    });
    
    app.config(function($routeProvider) {
        $routeProvider
        .when('/login', {
            template: '<login-directive></login-directive>'
        })
        .when('/userhome', {
            templateUrl: 'app/directive/userHomeTemplate.html'
        })
        .when('/adduser', {
            template: '<div register-directive = ""></div>'
        })
        .when('/viewuser', {
            template: '<div view-user-directive = ""></div>'
        })
        .otherwise({
            redirectTo: '/login'
        })
    });

    app.factory('authenticate', function() {
        return {
            login: function(login) {
                if(login.username === 'arun' && login.password === '5851') {
                    let uid = Math.floor((Math.random() * 100000000) + 1);
                    sessionStorage.setItem('userInfo', JSON.stringify({id: uid, name: login.username}));
                    return true;
                } else {
                    return false;
                }
            }
        }
    });

    app.factory('getUserFactory', function() {
        return {
            get: function() {
                let userList = JSON.parse(localStorage.getItem('userList'));
                if(userList) {
                    return userList;
                } else {
                    return [];
                }
            }
        }
    });

    app.factory('ipcMain', function() {
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
    
    app.factory('registerUserFactory', ['getUserFactory', function(getUserFactory) {
        let userList = getUserFactory.get();
        return {
            save: function(user) {
                if(Array.isArray(user)) {
                    userList = user;
                } else {
                    userList.push(user);
                }
                localStorage.setItem('userList', JSON.stringify(userList));
                return true;
            }
        }
    }]);

    app.directive('loginDirective', ['authenticate', '$location', function(authenticate, $location) {
        return {
            link: link,
            templateUrl: 'app/directive/loginTemplate.html'
        }
        function link(scope, element, attr) {
            scope.login = {
                username: '',
                password: ''
            }
            scope.auth = function() {
                if(authenticate.login(scope.login)) {
                    $location.path('/userhome');
                } else {
                    console.log('Invalid user....');
                }
            }
        }
    }]);

    app.directive('registerDirective', ['registerUserFactory', 'getUserFactory', 'ipcMain', '$location', function(registerUserFactory, getUserFactory, ipcMain, $location) {
        return {
            link: link,
            templateUrl: 'app/directive/addUserTemplate.html'
        }
        function link(scope, element, attr) {
            let editUser;
            function init() {
                editUser = ipcMain.get('user');
                if(editUser) {
                    scope.userList = editUser.userList;
                    scope.user = editUser.userList[editUser.id];
                    scope.buttonText = 'Update User';
                } else {
                    scope.userList = getUserFactory.get();
                    scope.user = {
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                        confPassword: '',
                        phone: '',
                        gender: 'male',
                        addressLine1: '',
                        addressLine2: '',
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
    }]);

    app.directive('userListDirective', ['getUserFactory', 'registerUserFactory', 'ipcMain', '$location', function(getUserFactory, registerUserFactory, ipcMain, $location) {
        return {
            link : link,
            templateUrl: 'app/directive/userListTemplate.html'
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
    
    app.directive('viewUserDirective', ['ipcMain', function(ipcMain) {
        return {
            link : link,
            templateUrl : 'app/directive/viewUserTemplate.html'
        };
        function link(scope,element, attr) {
            scope.user = ipcMain.get('user');
        }
    }]);

})();
