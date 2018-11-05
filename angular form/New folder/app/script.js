/*
*@auther:Ajeesh
*@description:form validation
*/

function nameValidation(input) {
	matchExp = /^[a-z]+/i;
	var name = input.value.match(matchExp);
	if(name == input.value) {
		changeClass(input, true);
	} else {
		changeClass(input, false);
	}
}
function emailValidation(input) {
	matchExp = /^\w+?\.?\w+@{1}\w+\.\w{2,3}\b/i;
	changeClass(input, matchExp.test(input.value));
}
function passValidation(input) {
	matchExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-+]).{6,20})/;
	return changeClass(input, matchExp.test(input.value));
}
function showHint(input) {
	if(!passValidation(input)) {
		$("#myModal").modal("show");
	}
}
function phoneValidation(input) {
	matchExp = /^\+?\d{0,3}\s?[(-]?\d{3}\)?\s?[-]?\d{2}?\s?\d?\s?[-]?\d{4}\b/;
	changeClass(input, matchExp.test(input.value));
}
function pinValidation(input) {
	matchExp = /^[0-9]{6}$/;
	changeClass(input, matchExp.test(input.value));
}
function validateCommon(input) {
	matchExp = /\w.*/i;
	return changeClass(input, matchExp.test(input.value));
}
//function for chekking mandatory fields are filled or not
function formFilled() {
	var form = document.getElementById("regForm");
	var flag = true;
	flag *= nameValidation(form[0]);
	flag *= nameValidation(form[1]);
	flag *= emailValidation(form[2]);
	flag *= passValidation(form[3]);
	flag *= phoneValidation(form[4]);
	flag *= validateCommon(form[7]);
	flag *= validateCommon(form[8]);
	flag *= validateCommon(form[9]);
	flag *= pinValidation(form[11]);
	return flag;
}
//function for validation chekking
function changeClass(input, flag) {
	if(flag) {
		input.setAttribute("class", "form-control valid");
	} else {
		input.setAttribute("class", "form-control invalid");
	}
	return flag;
}

document.getElementById("signup").addEventListener("click", function(e) {
	if(formFilled()) 
		window.location("www.google.com");
	} else {
		
	// alert("please fill all mandatory fields");
	// $("#myModal").modal("show");
	}
});
