myApp.controller('BudgetController', ['DataFactory', function(DataFactory) {
  console.log('budget controller running');

  var self = this;

  self.message = "Welcome to the Budget View";

  self.budgetHistory = DataFactory.budgetList;

  self.selectedBudget = DataFactory.budget;

  self.convertDate = function(date) {
    date = date.slice(0, 7);
    return date;
  };

  self.selectBudget = function(amount) {
    console.log('select budget clicked on', amount);
    DataFactory.useBudget(amount);
  };

  self.newBudget = {
    limit: 0,
    year: 0,
    month: '',
    getDate: function() {
      return this.year + '-' + this.month + '-' + '01';
    }
  };

  self.addNewBudget = function (){
    self.newBudget.date= self.newBudget.getDate();
    DataFactory.addBudget(self.newBudget);
  };


}]);
