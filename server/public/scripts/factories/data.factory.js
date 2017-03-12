myApp.factory('DataFactory', ['$http', function($http) {
  console.log("data factory running");

  var employeeData = {
    list:[],
    yearSalary: 0
  };

  var monthlyBudget = {
    limits: []
  };

  var currentBudget = [0];

  getEmployeeData();

  getBudgetData();

  function addEmployeeData(newEmployee) {
    $http({
      method: 'POST',
      url: '/data/employees',
      data: newEmployee
    }).then(function(response){
      console.log('add employee response:', response.data);
      getEmployeeData();
    });
  }

  function deleteEmployeeData(employeeID) {
    $http({
      method: 'DELETE',
      url: '/data/employees/' + employeeID
    }).then(function(response) {
      console.log('delete response:', response.data);
      getEmployeeData();
    });
  }

  function employeeActive(employeeID) {
    $http({
      method: 'PUT',
      url: '/data/activate/' + employeeID
    }).then(function(response) {
      console.log('activate response:', response.data);
      getEmployeeData();
    });
  }

  function employeeDeactive(employeeID) {
    $http({
      method: 'PUT',
      url: '/data/deactivate/' + employeeID
    }).then(function(response) {
      console.log('deactivate response:', response.data);
      getEmployeeData();
    });
  }

  function getEmployeeData() {
    $http({
      method: 'GET',
      url: '/data/employees'
    }).then(function(response) {
      console.log('employee get response:', response.data);
      employeeData.list = response.data;
      employeeData.yearSalary = yearlyTotal(employeeData.list);
    });
  }

  function getBudgetData() {
    $http({
      method: 'GET',
      url: '/data/budget'
    }).then(function(response) {
      console.log('budget get response:', response.data);
      monthlyBudget.limits = response.data;
      currentBudget[0] = response.data[monthlyBudget.limits.length - 1].budget_limit;
    });
  }

  function setBudget(amount) {
    currentBudget.pop();
    currentBudget.push(amount);
    console.log('currentBudget:', currentBudget);
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
    budgetList: monthlyBudget,
    addEmployee: addEmployeeData,
    deleteEmployee: deleteEmployeeData,
    activateEmployee: employeeActive,
    deactivateEmployee: employeeDeactive,
    useBudget: setBudget,
    budget: currentBudget
  };
}]);
