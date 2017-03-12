myApp.factory('DataFactory', ['$http', function($http) {
  console.log("data factory running");

  var employeeData = {  //this variable is exported to the controllers with the total salary and list of employees
    list:[],
    yearSalary: 0
  };

  var monthlyBudget = { //this variable is exported to the controllers with the budget history as an array
    limits: []
  };

  var currentBudget = { //this variable defines the current monthly budget
    amount: 0,
    id:0
  };

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

//function which makes the active status true for a selected employee
  function employeeActive(employeeID) {
    $http({
      method: 'PUT',
      url: '/data/activate/' + employeeID
    }).then(function(response) {
      console.log('activate response:', response.data);
      getEmployeeData();
    });
  }

//function which makes the active status false for a selected employee
  function employeeDeactive(employeeID) {
    $http({
      method: 'PUT',
      url: '/data/deactivate/' + employeeID
    }).then(function(response) {
      console.log('deactivate response:', response.data);
      getEmployeeData();
    });
  }

//function which gets the employee information from the database, and updates the yearly salary total property on the object provided to the controllers
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

//function that grabs the budget history from the db, and sets the current budget to the latest budget set
  function getBudgetData() {
    $http({
      method: 'GET',
      url: '/data/budget'
    }).then(function(response) {
      console.log('budget get response:', response.data);
      monthlyBudget.limits = response.data;
      var indexOfLatestBudget = monthlyBudget.limits.length - 1;
      setBudget(monthlyBudget.limits[indexOfLatestBudget].budget_limit, monthlyBudget.limits[indexOfLatestBudget].id);
    });
  }

//this function updates the current budget array with whatever is passed
  function setBudget(amount, id) {
    currentBudget.amount = amount;
    currentBudget.id = id;
    console.log('currentBudget:', currentBudget);
  }

//function for adding a budget to the database
  function addBudgetData(budgetObject) {
    console.log('addBudgetData in use with', budgetObject);
    $http({
      method: 'POST',
      url: '/data/budget',
      data: budgetObject
    }).then(function(response){
      console.log('bugdget post response:', response.data);
      getBudgetData();
    });
  }

//function that only totals the active employees' salaries
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
    budget: currentBudget,
    addBudget: addBudgetData
  };
}]);
