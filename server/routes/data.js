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
});//end router.get

router.post('/employees', function(req,res) {
  console.log('hit my post employees route');
  console.log(req.body);
});

module.exports = router;
