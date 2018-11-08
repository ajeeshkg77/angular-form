/*
* @auther : Ajeesh K George
* @Description : Main app script for Angular Registration Form
*/
(() => {
    angular.module('angForm')  
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/login', {
            template: '<login-directive></login-directive>',
            permission: true
        })
        .when('/userhome', {
            templateUrl: 'app/templates/userHomeTemplate.html'
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
    }]);
})();
