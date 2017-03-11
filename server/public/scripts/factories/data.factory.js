myApp.factory('DataFactory', ['$http', function($http) {
  console.log("data factory running");

  var employeeData = {list:[]};

  function getEmployeeData(){
    $http({
      method: 'GET',
      url: '/data/employees'
    }).then(function(response){
      console.log('response', response);
      console.log('response.data', response.data);
      employeeData.list = response.data;
    })
  }

  return {
    employees: employeeData,
    getEmployees: getEmployeeData
  }
}]);
