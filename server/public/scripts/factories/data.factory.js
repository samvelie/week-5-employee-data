myApp.factory('DataFactory', ['$http', function($http) {
  console.log("data factory running");

  var employeeData = {
    list:[],
    yearSalary: 0
  };

  getEmployeeData();

  function addEmployeeData(newEmployee) {
    $http({
      method: 'POST',
      url: '/data/employees',
      data: newEmployee
    }).then(function(response){
      console.log('put response', response);
      getEmployeeData();
    });
  }

  function deleteEmployeeData(employeeID) {
    $http({
      method: 'DELETE',
      url: '/data/employees/' + employeeID
    }).then(function(response) {
      console.log('delete response', response);
      getEmployeeData();
    });
  }

  function employeeActive(employeeID) {
    $http({
      method: 'PUT',
      url: '/data/activate/' + employeeID
    }).then(function(response) {
      console.log('delete response', response);
      getEmployeeData();
    });
  }

  function employeeDeactive(employeeID) {
    $http({
      method: 'PUT',
      url: '/data/deactivate/' + employeeID
    }).then(function(response) {
      console.log('delete response', response);
      getEmployeeData();
    });
  }

  function getEmployeeData() {
    $http({
      method: 'GET',
      url: '/data/employees'
    }).then(function(response) {
      console.log('response', response);
      console.log('response.data', response.data);
      employeeData.list = response.data;
      employeeData.yearSalary = yearlyTotal(employeeData.list);
    });
  }

  function yearlyTotal(employeeArray) {
    var salaryTotal = 0;
    for (var i = 0; i < employeeArray.length; i++) {
      if(employeeArray[i].active === true) {
        salaryTotal += parseFloat(employeeArray[i].salary);
      }
    }
    return salaryTotal;
  }

  return {
    employees: employeeData,
    getEmployees: getEmployeeData,
    addEmployee: addEmployeeData,
    deleteEmployee: deleteEmployeeData,
    activateEmployee: employeeActive,
    deactivateEmployee: employeeDeactive
  };
}]);
