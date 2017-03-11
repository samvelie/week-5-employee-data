myApp.controller('EmployeesController', ['DataFactory', function(DataFactory) {
  console.log('employees controller running');

  var self = this;

  self.message = "Welcome to the Employees View";

  self.employees = DataFactory.employees;

  self.newEmployee = {};

  self.addEmployee = function () {
    console.log('add employee button clicked');
    DataFactory.addEmployee(self.newEmployee);
    self.newEmployee = {};
  };
}]);
