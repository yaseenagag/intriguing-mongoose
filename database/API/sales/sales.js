const db = require('../../mainDB')




const Sales = {

  topping: require('./topping'),
  crust: require('./crust'),
  custom_pizza: require('./custom_pizza'),
  specialty_pizza: require('./specialty_pizza'),

  total: ( request, response, next ) => {
    db.any( `SELECT
            (SELECT sum(price) AS "Q1" FROM transaction JOIN order_data ON transaction.order_id = order_data.id WHERE DATE > '2016-01-01' AND DATE < '2016-04-01'),
            (SELECT sum(price) AS "Q2" FROM transaction JOIN order_data ON transaction.order_id = order_data.id WHERE DATE > '2016-04-01' AND DATE < '2016-07-01'),
            (SELECT SUM(price) AS "Q3" FROM transaction JOIN order_data ON transaction.order_id = order_data.id WHERE DATE > '2016-07-01'AND DATE < '2016-09-01'),
            (SELECT SUM(price) AS "Q4" FROM transaction JOIN order_data ON transaction.order_id = order_data.id WHERE DATE > '2016-09-01'AND DATE < '2017-01-01'),
            (SELECT sum(price) AS "Total" FROM order_data);`
          )
    .then( data => {
      response.status(200)
      .json({
        status: 'succes',
        data: data,
        message: 'Returned sales for 2016.'
      })
    })
    .catch( error => next( error ))
  }
}

module.exports = Sales
