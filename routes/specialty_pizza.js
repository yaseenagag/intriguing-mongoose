const express = require('express');
const router = express.Router();
const { Specialty_pizza } = require('../database/specialty_pizzaDB')



router.post( '/details', ( request, response) => {
  const { customer_id, order_id, pizza_id } = request.body
  Promise.all([ Specialty_pizza.getById( pizza_id ) ])
  .then( data => {
    response.render( 'specialty_pizza/details', { specialty_pizza: data[0],
                                                  customer_id: customer_id,
                                                  order_id: order_id } )
  })
})

router.get ('/add/:customer_id/:order_id' , (request, response) => {
  const { customer_id, order_id } = request.params
  Promise.all ([ Specialty_pizza.getAll() ] )
  .then( data => {
    response.render ( 'specialty_pizza/add', {specialty_pizza: data[0],
                                              customer_id: customer_id,
                                              order_id: order_id } )
  })
})

router.post ('/add' , (request, response) => {
  const { pizza_id } = request.body

  Promise.all ([ Specialty_pizza.getAll() ] )
  .then( data => {
    response.render ( 'specialty_pizza/add', {specialty_pizza: data[0]} )
  })
})

module.exports = router;
