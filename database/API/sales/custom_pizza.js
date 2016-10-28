const db = require('../../mainDB')

const custom_pizza = {

  total: ( request, response, next ) => {
    db.any( `SELECT
            (SELECT sum(custom_pizza.price) AS "Q1" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
              JOIN custom_pizza ON ordered_custom_pizzas.pizza_id = custom_pizza.id WHERE DATE > '2016-01-01' AND DATE < '2016-04-01'),
            (SELECT sum(custom_pizza.price) AS "Q2" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
              JOIN custom_pizza ON ordered_custom_pizzas.pizza_id = custom_pizza.id WHERE DATE > '2016-04-01' AND DATE < '2016-07-01'),
              (SELECT sum(custom_pizza.price) AS "Q3" FROM transaction
            JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
              JOIN custom_pizza ON ordered_custom_pizzas.pizza_id = custom_pizza.id WHERE DATE > '2016-07-01' AND DATE < '2016-09-01'),
            (SELECT sum(custom_pizza.price) AS "Q4" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
              JOIN custom_pizza ON ordered_custom_pizzas.pizza_id = custom_pizza.id WHERE DATE > '2016-09-01' AND DATE < '2017-01-01'),
            (SELECT sum(custom_pizza.price) AS "Total" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
              JOIN custom_pizza ON ordered_custom_pizzas.pizza_id = custom_pizza.id )` )
        .then( data => {
            response.status(200)
            .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved sales for custom pizzas.'
                })
        })
        .catch( error => next( error ))
  }


}

module.exports = custom_pizza
