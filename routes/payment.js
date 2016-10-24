const express = require('express');
const router = express.Router();
const db = require('../database/mainDB')
const { Payment } = require( '../database/paymentDB' )
const { Customer } = require( '../database/customerDB' )


router.get( '/add/:customer_id', ( request, response ) => {
    const {customer_id} = request.params
    response.render('payment/add', {customer_id:customer_id})
})

router.post( '/add', ( request, response ) => {
  const { card_type, card_number, expiration_date, csv, cardholder_name, customer_id } = request.body

  Promise.all([ Payment.add( card_type, card_number, expiration_date, csv, cardholder_name ) ])
  .then( data => {
    const payment_id = data[0].id
    response.redirect(`/payment/create/${customer_id}/${payment_id}`)
  })
})

router.get (`/create/:customer_id/:payment_id`, (request, response) => {
  const {customer_id, payment_id} = request.params
  Promise.all ([Payment.joinCard(customer_id, payment_id)]) .then(
   response.redirect(`/customer/details/${customer_id}`))
})

router.get( '/', ( request, response ) => {
  Promise.all([ Payment.getAll() ]).then( payment => {
    response.render('payment/index.pug', { payment: payment[0] })
  })
})

router.get( '/edit/:payment_id', ( request, response ) => {
  const { payment_id } = request.params

  Promise.all([ Payment.getById( payment_id ) ]).then( data => {
    response.render( 'payment/edit', { payment: data[0]} )
  })
})

router.post( '/edit/:payment_id', ( request, response ) => {
  const { payment_id } = request.params
  const { card_type, card_number, expiration_date, csv, cardholder_name} = request.body

  Promise.all([ Payment.update( card_type, card_number, expiration_date, csv, cardholder_name) ])
  .then( response.redirect( '/payment/' ) )

})

router.get( '/delete/:payment_id', ( request, response ) => {
  const { payment_id } = request.params

  Promise.all([ Payment.getById( payment_id ) ]).then( data => {
      response.render( 'payment/delete', { payment: data[0] } )
  })
})

router.post( '/delete/:payment_id', ( request, response ) => {
  const { payment_id } = request.params

  Promise.all([ Payment.delete( payment_id ) ]).then( data => {
      response.redirect( '/payment/' )
  })
})

module.exports = router;
