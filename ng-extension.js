function parseClass(classNames) {
    var res = {
        $text: classNames,
        $array: classNames.split(' '),
    };
    res.$array.forEach(function (className) { return res[className] = true; });
    return res;
}

angular.module('ngExtension', [])
    .directive('ngClassModel', function () { return ({
        restrict: 'A',
        controller: ['$scope', '$element', '$parse', function ($scope, $element, $parse) {
            var targetGetter = $parse($element.attr('ng-class-model'));
            var targetSetter = targetGetter.assign;
            $scope.$watch(function () { return $element.attr('class'); }, function (classNames) {
                targetSetter($scope, parseClass(classNames));
            });
        }]
    });})
    .directive('ngClassChange', function () { return ({
        restrict: 'A',
        controller: ['$scope', '$element', '$parse', function ($scope, $element, $parse) {
            var targetGetter = $parse($element.attr('ng-class-change'));
            $scope.$watch(function () { return $element.attr('class'); }, function (classNames) {
                $scope.$event = {
                    target: $element,
                    classModel: parseClass(classNames)
                };
                targetGetter($scope);
            });
        }]
    });});
    
