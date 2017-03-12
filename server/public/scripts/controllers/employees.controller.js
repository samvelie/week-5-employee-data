myApp.controller('EmployeesController', ['DataFactory', function(DataFactory) {
  console.log('employees controller running');

  var self = this;

  self.employees = DataFactory.employees;

  self.monthlyBudget = DataFactory.budget;

  self.newEmployee = {};

  self.addEmployee = function () {
    console.log('add employee button clicked');
    DataFactory.addEmployee(self.newEmployee);
    self.newEmployee = {};
  };

  self.deleteEmployee = function (employeeID) {
    console.log('delete employee clicked on', employeeID);
    DataFactory.deleteEmployee(employeeID);
  };

  self.activateEmployee = function(employeeID) {
    console.log('activate employee clicked on', employeeID);
    DataFactory.activateEmployee(employeeID);
  };

  self.deactivateEmployee = function(employeeID) {
    console.log('deactive employee clicked on', employeeID);
    DataFactory.deactivateEmployee(employeeID);
  };
}]);
