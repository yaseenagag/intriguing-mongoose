const db = require('../../mainDB')

const crust = {

  total: ( request, response, next ) => {
    db.any( `SELECT
            (SELECT SUM(crust.price) AS "Q1" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id = pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id = crust.id WHERE DATE > '2016-01-01' AND DATE < '2016-04-01'),

            (SELECT SUM(crust.price) AS "Q2" FROM transaction
            JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id = pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id = crust.id WHERE DATE > '2016-04-01' AND DATE < '2016-07-01'),

            (SELECT SUM(crust.price) AS "Q3" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id = pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id = crust.id WHERE DATE > '2016-07-01' AND DATE < '2016-09-01'),

            (SELECT SUM(crust.price) AS "Q4" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id = pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id = crust.id WHERE DATE > '2016-09-01' AND DATE < '2017-01-01'),

            (SELECT sum(crust.price) AS "Total" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_custom_pizzas ON order_data.id=ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id=pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id=crust.id)` )
      .then( data => {
        response.status(200)
        .json({
                status: 'success',
                data: data,
                message: 'Retrieved pizza crust sales.'
              })
      })
      .catch( error => next( error ))
  },

  by_id: ( request, response, next ) => {
    const { id } = request.params

    db.any( `SELECT
            (SELECT SUM(crust.price) AS "Q1" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id = pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id = crust.id WHERE DATE > '2016-01-01' AND DATE < '2016-04-01' AND crust.id = ${ id }),

            (SELECT SUM(crust.price) AS "Q2" FROM transaction
            JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id = pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id = crust.id WHERE DATE > '2016-04-01' AND DATE < '2016-07-01' AND crust.id = ${ id }),

            (SELECT SUM(crust.price) AS "Q3" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id = pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id = crust.id WHERE DATE > '2016-07-01' AND DATE < '2016-09-01' AND crust.id = ${ id }),

            (SELECT SUM(crust.price) AS "Q4" FROM transaction
                JOIN order_data ON transaction.order_id = order_data.id
                JOIN ordered_custom_pizzas ON order_data.id = ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id = pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id = crust.id WHERE DATE > '2016-09-01' AND DATE < '2017-01-01' AND crust.id = ${ id }),

            (SELECT sum(crust.price) AS "Total" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_custom_pizzas ON order_data.id=ordered_custom_pizzas.order_id
                JOIN pizza_crusts ON ordered_custom_pizzas.pizza_id=pizza_crusts.pizza_id
                JOIN crust ON pizza_crusts.crust_id=crust.id WHERE crust.id = ${ id })` )
        .then( data => {
            response.status(200)
            .json({
                    status: 'success',
                    data: data,
                    message: `Retrieved annual sales of single crust type.`
                  })
        })
        .catch( error => next( error ))
  }

}

module.exports = crust
