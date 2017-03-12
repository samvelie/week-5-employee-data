myApp.controller('BudgetController', ['DataFactory', function(DataFactory) {
  console.log('budget controller running');

  var self = this;

  self.budgetHistory = DataFactory.budgetList; //this is an object which contains all the budget history as an array

  self.selectedBudget = DataFactory.budget; //this is an object that contains the currently used budget and its id


  self.newBudget = { //this variable is manipulated by the entry fields on the html page
    limit: 0,
    year: 0,
    month: '',
    getDate: function() { //this internal function makes it so every selected month and year gets the first of the month recorded
      return this.year + '-' + this.month + '-' + '01';
    }
  };

  self.convertDate = function(date) { //this function is to remove the unnecessary date components (after month and year) for the view
    date = date.slice(0, 7);
    return date;
  };

  self.selectBudget = function(amount, id) { //this allows the user to select a budget to test with the current employee list
    console.log('select budget clicked on', amount);
    DataFactory.useBudget(amount, id);
  };

  self.addNewBudget = function (){
    self.newBudget.date= self.newBudget.getDate(); //adds a date property that will be easily readable by SQL
    DataFactory.addBudget(self.newBudget);
  };


}]);
