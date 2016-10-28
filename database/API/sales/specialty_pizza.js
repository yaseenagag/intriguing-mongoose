const db = require('../../mainDB')

const specialty_pizza = {

  total: ( request, response, next ) => {
    db.any( `SELECT
            (SELECT sum(specialty_pizza.price) AS "Q1" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE DATE > '2016-01-01' AND DATE < '2016-04-01'),

            (SELECT sum(specialty_pizza.price) AS "Q2" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE DATE > '2016-04-01' AND DATE < '2016-07-01'),

            (SELECT sum(specialty_pizza.price) AS "Q3" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE DATE > '2016-07-01' AND DATE < '2016-09-01'),

            (SELECT sum(specialty_pizza.price) AS "Q4" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE DATE > '2016-09-01' AND DATE < '2017-01-01'),

            (SELECT sum(specialty_pizza.price) AS "Total" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id )` )
      .then( data => {
        response.status(200)
        .json({
                status: 'success',
                data, data,
                message: 'Retrieved specialty_pizza sales.'
              })
      })
      .catch( error => next( error ))
  },

  by_id: ( request, response, next ) => {
    const { id } = request.params

    db.any( `SELECT
            (SELECT sum(specialty_pizza.price) AS "Q1" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE DATE > '2016-01-01' AND DATE < '2016-04-01' AND specialty_pizza.id = ${ id }),

            (SELECT sum(specialty_pizza.price) AS "Q2" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE DATE > '2016-04-01' AND DATE < '2016-07-01' AND specialty_pizza.id = ${ id }),

            (SELECT sum(specialty_pizza.price) AS "Q3" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE DATE > '2016-07-01' AND DATE < '2016-09-01' AND specialty_pizza.id = ${ id }),

            (SELECT sum(specialty_pizza.price) AS "Q4" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE DATE > '2016-09-01' AND DATE < '2017-01-01' AND specialty_pizza.id = ${ id }),

            (SELECT sum(specialty_pizza.price) AS "Total" FROM transaction
              JOIN order_data ON transaction.order_id = order_data.id
              JOIN ordered_specialty_pizzas ON order_data.id = ordered_specialty_pizzas.order_id
              JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE specialty_pizza.id = ${ id })` )
          .then( data => {
            response.status(200)
            .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved annual sales for specified specialty_pizza.'
                  })
          })
          .catch( error => next( error ))
  }

}

module.exports = specialty_pizza
