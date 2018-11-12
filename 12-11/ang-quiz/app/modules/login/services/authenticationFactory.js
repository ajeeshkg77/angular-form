angular.module('quizApp')
.factory('authenticationFactory', authenticationFactory);

authenticationFactory.$inject = ['$location', '$rootScope'];
function authenticationFactory($location, $rootScope) {
    const authenticationFactoryObject = {
        login: login
    }

    return authenticationFactoryObject;

    function login(user) {
        if(user.email === 'admin' && user.password === 'admin') {
            $rootScope.$broadcast('loginSuccess');
            $location.path('/userhome');
        } else {
            console.log('Login Failed!');
        }
    }
}
