const express = require( 'express' )
const router = express.Router()

const Transaction = require( '../database/transactionDB' )
const { Payment } = require( '../database/paymentDB' )

router.get( '/', ( request, response ) => {
  Promise.all([ Transaction.getAll() ])
  .then( transactions => response.render( 'transaction/index', { transactions: transactions[0] } ))
})

router.get( '/details/:customer_id/:transaction_id', ( request, response ) => {
  const { customer_id, transaction_id } = request.params
  Promise.all([ Transaction.getById( transaction_id ) ])
  .then( r_transaction => response.render( 'transaction/details', { transaction: r_transaction[0],
                                                                    customer_id: customer_id } ))
})

router.post( '/new', ( request, response ) => {
  const { customer_id, order_id } = request.body
  Promise.all([ Transaction.new( order_id ) ])
  .then( r_transaction_id => {
    const transaction_id = r_transaction_id[0].id
    response.redirect( `/transaction/create/${customer_id}/${transaction_id}` )
  })
})

router.get( '/create/:customer_id/:transaction_id', ( request, response ) => {
  const { customer_id, transaction_id } = request.params
  Promise.all([ Transaction.bindCustomer( customer_id, transaction_id ) ])
  response.redirect( `/transaction/details/${customer_id}/${transaction_id}` )
})

router.get( '/pay/:customer_id/:transaction_id', ( request, response ) => {
  const { customer_id, transaction_id } = request.params
  Promise.all([ Payment.getAll() ])
  .then( r_payments => response.render( 'transaction/pay_transaction', { payments: r_payments[0],
                                                                          transaction_id: transaction_id,
                                                                          customer_id: customer_id } ))

})

router.post( '/pay/:customer_id/:transaction_id', ( request, response ) => {
  const { customer_id, transaction_id } = request.params
  const { payment_id } = request.body

  Promise.all([ Transaction.pay( transaction_id, payment_id ) ])
  .then( response.redirect( "/" ) )
})

module.exports = router
