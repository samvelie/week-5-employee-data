myApp.controller('EmployeesController', ['DataFactory', function(DataFactory) {
  console.log('employees controller running');

  var self = this;

  self.message = "Welcome to the Employees View";

  self.newEmployee = {};

  DataFactory.getEmployees();

  self.employees = DataFactory.employees;

}]);
