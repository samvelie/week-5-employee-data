var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 15000
};

var pool = new pg.Pool(config);

router.get('/employees', function(req, res) {
  console.log('retrieving employee data');
  pool.connect(function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM employees ORDER BY id;', function (err, result) {
        done();
        if(err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.status(200).send(result.rows);
        }
      }); // end client.query
    }
  });
});//end employees router.get

router.post('/employees', function(req,res) {
  var newEmployee = req.body;
  console.log('adding new employee:', newEmployee);
  pool.connect(function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
        client.query('INSERT INTO employees(first_name, last_name, employee_number, job_title, salary) VALUES($1, $2, $3, $4, $5);',
          [newEmployee.firstName, newEmployee.lastName, newEmployee.employeeID, newEmployee.jobTitle, newEmployee.salary],
          function(err, result) {
            done();
            if(err) {
              console.log(err);
              res.sendStatus(500);
            } else {
                res.sendStatus(201);
              }
          }
        );
      }
  });//end pool.connect
});//end employees router.post

router.put('/activate/:id', function(req,res) {
  var idOfEmployeeToActivate = req.params.id;
  console.log('activating employee with id#',  idOfEmployeeToActivate);
  pool.connect(function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
        client.query('UPDATE employees SET active=TRUE WHERE ID=$1;',
          [idOfEmployeeToActivate],
          function(err, result) {
            done();
            if(err) {
              console.log(err);
              res.sendStatus(500);
            } else {
                res.sendStatus(200);
              }
          }
        );
      }
  });//end pool.connect
});//end activate router.put

router.put('/deactivate/:id', function(req,res) {
  var idOfEmployeeToDeactivate = req.params.id;
  console.log('deactivating employee with id#',  idOfEmployeeToDeactivate);
  pool.connect(function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
        client.query('UPDATE employees SET active=FALSE WHERE ID=$1;',
          [idOfEmployeeToDeactivate],
          function(err, result) {
            done();
            if(err) {
              console.log(err);
              res.sendStatus(500);
            } else {
                res.sendStatus(200);
              }
          }
        );
      }
  });//end pool.connect
});//end deactivate router.put

router.delete('/employees/:id', function(req,res) {
  var idOfEmployeeToDelete = req.params.id;
  console.log('deleting employee with id#',  idOfEmployeeToDelete);
  pool.connect(function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
        client.query('DELETE FROM employees WHERE id=$1;',
          [idOfEmployeeToDelete],
          function(err, result) {
            done();
            if(err) {
              console.log(err);
              res.sendStatus(500);
            } else {
                res.sendStatus(200);
              }
          }
        );
      }
  });//end pool.connect
});//end employees router.delete

module.exports = router;
