const db = require('../../mainDB')
const sales = require('./Sales')

const beverage = {

  total: ( request, response, next) => {
    db.any( `SELECT
            (SELECT SUM(beverage.price) AS "Q1" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id WHERE DATE > '${sales.Q1Start}' AND DATE < '${sales.Q1End}'),
            (SELECT SUM(beverage.price) AS "Q2" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id WHERE DATE > '${sales.Q2Start}' AND DATE < '${sales.Q2End}'),
            (SELECT SUM(beverage.price) AS "Q3" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id WHERE DATE > '${sales.Q3Start}' AND DATE < '${sales.Q3End}'),
            (SELECT SUM(beverage.price) AS "Q4" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id WHERE DATE > '${sales.Q4Start}' AND DATE < '${sales.Q4End}'),
            (SELECT SUM(beverage.price) AS "Total" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id)` )
      .then( data => {
        response.status(200)
        .json({
                status: 'success',
                data: data,
                message: 'Retrieved annual sales data for beverages.'
              })
      })
      .catch( error => next( error))
  },

  by_id: ( request, response, next) => {
    const { id } = request.params
    console.log(id)
    db.any( `SELECT
            (SELECT SUM(beverage.price) AS "Q1" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id WHERE DATE > '${sales.Q1Start}' AND DATE < '${sales.Q1End}' AND beverage.id = ${id}),
            (SELECT SUM(beverage.price) AS "Q2" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id WHERE DATE > '${sales.Q2Start}' AND DATE < '${sales.Q2End}' AND beverage.id = ${id}),
            (SELECT SUM(beverage.price) AS "Q3" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id WHERE DATE > '${sales.Q3Start}' AND DATE < '${sales.Q3End}' AND beverage.id = ${id}),
            (SELECT SUM(beverage.price) AS "Q4" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id WHERE DATE > '${sales.Q4Start}' AND DATE < '${sales.Q4End}' AND beverage.id = ${id}),
            (SELECT SUM(beverage.price) AS "Total" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN ordered_beverages ON order_data.id=ordered_beverages.order_id
                JOIN beverage ON ordered_beverages.beverage_id=beverage.id WHERE beverage.id = ${id})` )
      .then( data => {
        response.status(200)
        .json({
                status: 'success',
                data: data,
                message: 'Retrieved annual sales info for specified beverage.'
              })
      })
      .catch( error => next( error))

  }

}

module.exports = beverage
