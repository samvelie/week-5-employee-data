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
  console.log('hit my get for employees route');
  pool.connect(function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM employees;', function (err, result) {
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
  console.log('hit my post employees route');
  var newEmployee = req.body;
  console.log(newEmployee + ' being added');
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

module.exports = router;
