var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/employees', {
            templateUrl: '/views/templates/employees.html',
            controller: 'EmployeesController',
            controllerAs: 'ec'
        })
        .when('/budget', {
            templateUrl: '/views/templates/budget.html',
            controller: 'BudgetController',
            controllerAs: 'bc'
        })
        .otherwise({
            redirectTo: 'employees'
        });
}]);
