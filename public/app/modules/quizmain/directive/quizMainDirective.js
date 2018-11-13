angular.module('quizApp')
.directive('quizMainDirective', quizMainDirective);

quizMainDirective.$inject = ['$location', 'dataTrans'];
function quizMainDirective($location, dataTrans) {

    const quizMainObject = {
        templateUrl: 'app/views/quizMainTemplate.html',
        link: link
    }

    return quizMainObject;

    function link(scope, element, attr) {
        let questNo = 0;
        const questData = dataTrans.get('questData');

        if(questData) {
            init();
        } else {
            $location.path('/userhome');
        }
        function init() {
            scope.quest = questData[questNo];
            scope.options = {
                finish: false
            }
        }
        scope.finish = function() {
            dataTrans.set('result', questData);
            $location.path('/result');
        }
        scope.nextQuestion = function() {
            if(questNo < questData.length - 1) {
                ++questNo;
                init();
            } else {
                scope.options.finish = true;
            }
        }
        scope.previousQuestion = function() {
            if(questNo > 0) {
                --questNo;
                init();
            }
        }
    }
}
