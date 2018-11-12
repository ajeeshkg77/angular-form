
angular.module('quizApp')
.directive('loginDirective', loginDirective);

loginDirective.$inject = ['authenticationFactory'];
function loginDirective(authenticationFactory) {
    return {
        templateUrl: 'app/views/loginTemplate.html',
        link: link
    }
    function link(scope, elemetnt, attr) {
        function init() {
            scope.user = {
                email: '',
                password: '',
                remember: false
            }
        }
        init();
        scope.auth = function() {
            authenticationFactory.login(scope.user);
        }
    }
}
