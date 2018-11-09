(()=>{
	angular.module('quizApp')
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
		.when('/login',{
			template:'<login-directive></login-directive>'
		})
		.when('/subject',{
			template:'<subject-directive></subject-directive>'
		})
		.otherwise({
			redirectTo:'/login'
		})
	}])
})();