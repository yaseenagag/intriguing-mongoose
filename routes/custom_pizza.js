const express = require('express');
const router = express.Router();
const { Crust, Topping, CustomPizza } = require('../database/custom_pizzaDB')
// const { Crust } = require('../database/crustDB')
// const { Topping } = require('../database/toppingsDB')

router.get('/', ( request, response ) => {
  Promise.all([ CustomPizza.getAll() ])
  .then( data => {
    response.render( 'custom_pizzas/index', { pizzas: data[0] } )
  })
})

router.get( '/details/:pizza_id/:customer_id/:order_id', ( request, response) => {
  const { pizza_id, customer_id, order_id } = request.params

  Promise.all([ CustomPizza.getCrust( pizza_id ), CustomPizza.getToppings( pizza_id ), Topping.getAll(), CustomPizza.calcPrice( pizza_id ) ])
  .then( data => {
    response.render( 'custom_pizzas/details', { pizza_id: pizza_id,
                                                crust: data[0],
                                                toppings: data[1],
                                                toppingsList: data[2],
                                                pizza_price: data[3].price,
                                                customer_id: customer_id,
                                                order_id: order_id } )
  })
})

router.get( '/add/:customer_id/:order_id', ( request, response ) => {
  const { customer_id, order_id } = request.params
  Promise.all([ Crust.getAll() ])
  .then( data => {
    response.render( 'custom_pizzas/add', { crusts: data[0],
                                            customer_id: customer_id,
                                            order_id: order_id } )
  })
})

router.post( '/add', ( request, response ) => {
  const { customer_id, crust_id, order_id } = request.body

  Promise.all([ CustomPizza.add( crust_id ) ])
  .then( data => {
    response.redirect( `/custom_pizza/create/${data[0].id}/${crust_id}/${customer_id}/${order_id}` )
  })
})

router.get( '/create/:pizza_id/:crust_id/:customer_id/:order_id', (request, response ) => {
  const { pizza_id, crust_id, customer_id, order_id } = request.params

  Promise.all([ CustomPizza.addCrust( pizza_id, crust_id ) ])
  .then( response.redirect( `/custom_pizza/details/${pizza_id}/${customer_id}/${order_id}` ) )
})

router.post( '/add-topping/:pizza_id/:customer_id/:order_id', ( request, response ) => {
  const { pizza_id, customer_id, order_id } = request.params
  const { addTopping } = request.body

  Promise.all([ CustomPizza.addTopping( pizza_id, addTopping ) ])
  .then(
    response.redirect( `/custom_pizza/details/${pizza_id}/${customer_id}/${order_id}` ))
})

router.get( '/delete-topping/:pizza_id/:topping_id/:customer_id/:order_id', ( request, response ) => {
  const { pizza_id, topping_id, customer_id, order_id } = request.params

  Promise.all([ CustomPizza.deleteTopping( pizza_id, topping_id )])
  .then( response.redirect( `/custom_pizza/details/${pizza_id}/${customer_id}/${order_id}`))
})



module.exports = router
