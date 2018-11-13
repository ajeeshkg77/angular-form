angular.module('quizApp')
.directive('resultDirective', resultDirective);

resultDirective.$inject = ['dataTrans', '$location'];
function resultDirective(dataTrans, $location) {

    resultObject = {
        link: link,
        templateUrl: 'app/views/resultViewTemplate.html'
    }

    return resultObject;

    function link(scope, element, attr) {
        let resultShteet = dataTrans.get('result');
        if(resultShteet) {
            scope.score = getScore();
        } else {
            $location.path('/userhome');
        }

        function getScore() {
            let score = 0;

            for(let i = 0; i < resultShteet.length; i++) {
                if(resultShteet[i].ans === resultShteet[i].selected) {
                    score++;
                }
            }

            return score;
        }
    }
}
