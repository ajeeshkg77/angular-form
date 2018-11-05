var app = angular.module("myApp", []);
app.controller("formCtrl", ['$scope', function($scope) {
        $scope.ph_numbr = /^\+?\d{10}$/;
        $scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        $scope.name_add = /^[a-z]+/i;
        $scope.pass_add = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-+]).{6,20})/;
        $scope.pin_add =   /^[0-9]{6}$/;
        $scope.submitForm=function(){
        	let formObj={
        		name : $scope.fname,
        		email : $scope.email,
        		password : $scope.password,
        		phone : $scope.contact,
        		address : $scope.address,
        		city : $scope.city,
        		state : $scope.state,
        		pin : $scope.pin

        	}
        	console.log(formObj);
        localStorage.setItem('server',JSON.stringify(formObj));
            
        }
}]);