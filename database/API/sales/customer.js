const db = require('../../mainDB')
const sales = require('./Sales')

const customer = {


    by_id: (request, response, next  ) => {
      const { id } = request.params
     db.any( `SELECT
            (SELECT SUM(price) AS "Q1" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN customer_transactions ON transaction.id=customer_transactions.transaction_id
                JOIN customer ON customer_transactions.customer_id=customer.id WHERE DATE > '2016-01-01' AND DATE < '2016-04-01' AND customer.id=${id}),
            (SELECT SUM(price) AS "Q2" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN customer_transactions ON transaction.id=customer_transactions.transaction_id
                JOIN customer ON customer_transactions.customer_id=customer.id WHERE DATE > '2016-04-01' AND DATE < '2016-07-01' AND customer.id=${id}),
            (SELECT SUM(price) AS "Q3" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN customer_transactions ON transaction.id=customer_transactions.transaction_id
                JOIN customer ON customer_transactions.customer_id=customer.id WHERE DATE > '2016-07-01' AND DATE < '2016-09-01' AND customer.id=${id}),
            (SELECT SUM(price) AS "Q4" FROM transaction
                JOIN order_data ON transaction.order_id=order_data.id
                JOIN customer_transactions ON transaction.id=customer_transactions.transaction_id
                JOIN customer ON customer_transactions.customer_id=customer.id WHERE DATE > '2016-09-01' AND DATE < '2017-01-01' AND customer.id=${id})`)
    .then( data => {
      response.status(200)
      .json({
              status: 'success',
              data: data,
              message: 'Retrieved annual sales data for customer.'
            })
    })
    .catch( error => next( error))
  }

}


module.exports = customer
