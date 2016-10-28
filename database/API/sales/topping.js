const db = require('../../mainDB')

const topping = {

  total: ( request, response, next ) => {
    db.any(`SELECT
            (SELECT SUM(topping.price) AS "Q1" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id WHERE DATE > '2016-01-01' AND DATE < '2016-04-01'),

            (SELECT SUM(topping.price) AS "Q2" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id WHERE DATE > '2016-04-01' AND DATE < '2016-07-01'),

             (SELECT SUM(topping.price) AS "Q3" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id WHERE DATE > '2016-07-01' AND DATE < '2016-09-01'),

            (SELECT SUM(topping.price) AS "Q4" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id WHERE DATE > '2016-09-01' AND DATE < '2017-01-01'),

            (SELECT sum(topping.price) AS "Total" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id )`)
    .then( data => {
      response.status(200)
      .json({
              status: 'succes',
              data: data,
              message: 'Topping sales for 2016.'
      })
    })
    .catch( error => next( error ))
  },

  by_name: ( request, response, next ) => {
    const { name } = request.params
    db.any( `SELECT
            (SELECT sum(topping.price) AS "Q1" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id WHERE DATE > '2016-01-01' AND DATE < '2016-04-01' AND topping.name = '${name}'),

            (SELECT sum(topping.price) AS "Q2" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id WHERE DATE > '2016-04-01' AND DATE < '2016-07-01' AND topping.name = '${name}'),

            (SELECT sum(topping.price) AS "Q3" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id WHERE DATE > '2016-07-01' AND DATE < '2016-09-01' AND topping.name = '${name}'),

            (SELECT sum(topping.price) AS "Q4" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id WHERE DATE > '2016-09-01' AND DATE < '2017-01-01' AND topping.name = '${name}'),

            (SELECT sum(topping.price) AS "Annual Total" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_toppings ON ordered_custom_pizzas.pizza_id = pizza_toppings.pizza_id
                JOIN topping ON pizza_toppings.topping_id = topping.id WHERE topping.name = '${name}')` )
    .then( data => {
      response.status(200)
      .json({
              status: 'success',
              total_sales: data,
              message: 'Pulled annual sales data for topping.'
      })
    })
    .catch( error => next( error ))
  },




}

module.exports = topping
