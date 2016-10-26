const express = require('express');
const router = express.Router();
const { Order } = require('../database/orderDB')
const { Customer } = require('../database/customerDB')

router.get( '/', ( request, response ) => {
    Promise.all([ Order.getAll() ])
    .then( orderData => response.render( 'orders/index', { orders: orderData[0] } ) )
})

router.get( '/details/:customer_id/:order_id', ( request, response ) => {
  const { customer_id, order_id } = request.params

  Promise.all([ Order.getContents( order_id), Order.calcPrice( order_id ) ])
  .then( data => {

    const results = data[0]
    const order_price = data[1].price

    const custom_pizza_ids = []
    const specialty_pizza_ids = []
    const beverage_ids = []

    for ( data of results ) {
      let { customp } = data
      if ( customp ) custom_pizza_ids.push( customp )
    }

    for ( data of results ) {
      let { specialtyp } = data
      if ( specialtyp ) specialty_pizza_ids.push( specialtyp )
    }

    for ( data of results ){
      let { beverage } = data
      if (beverage) beverage_ids.push(beverage)
    }

    response.render('orders/details', { customPizzas: custom_pizza_ids,
                                        specialtyPizzas: specialty_pizza_ids,
                                        beverages: beverage_ids,
                                        order_id: order_id,
                                        order_price: order_price,
                                        customer_id: customer_id})
  })
})

router.post( '/new', ( request, response ) => {
  const { customer_id } = request.body
  console.log("customer ID ", customer_id)
  response.render( 'orders/new', { customer_id: customer_id } )
})

router.post( '/new/create/:customer_id', ( request, response ) => {
    const { customer_id } = request.params
    Promise.all([ Order.new() ])
    .then( r_order_id => {
      const order_id = r_order_id[0]
      response.redirect( `/order/details/${customer_id}/${order_id.id}` )
    })
})

router.post( '/add/custom_pizza', ( request, response ) => {
  const { customer_id, order_id, pizza_id } = request.body
  Promise.all([ Order.addCustomPizza( order_id, pizza_id ) ])
  .then( response.redirect( `/order/details/${customer_id}/${order_id}` ) )
})

router.post( '/add/specialty_pizza/:pizza_id/:customer_id/:order_id', ( request, response ) =>{
  const { customer_id, order_id, pizza_id } = request.params
  Promise.all([ Order.addSpecialtyPizza( order_id, pizza_id ) ])
  .then( response.redirect( `/order/details/${customer_id}/${order_id}` ) )
})

router.get( '/add/beverage/:beverage_id/:customer_id/:order_id', ( request, response ) => {
  const { beverage_id, customer_id, order_id } = request.params
  Promise.all([ Order.addBeverage( order_id, beverage_id ) ])
  .then( response.redirect( `/order/details/${customer_id}/${order_id}` ) )
})

router.get( '/remove/custom_pizza/:pizza_id/:customer_id/:order_id', ( request, response ) =>{
  const { customer_id, order_id, pizza_id } = request.params
  Promise.all([ Order.removeCustomPizza( order_id, pizza_id ) ])
  .then( response.redirect( `/order/details/${customer_id}/${order_id}` ) )
})

router.get( '/remove/specialty_pizza/:pizza_id/:customer_id/:order_id', ( request, response ) => {
  const { customer_id, order_id, pizza_id } = request.params
  Promise.all([ Order.removeSpecialtyPizza( order_id, pizza_id ) ])
  .then( response.redirect( `/order/details/${customer_id}/${order_id}` ) )
})

router.get( '/remove/beverage/:beverage_id/:customer_id/:order_id', ( request, response ) => {
  const { customer_id, order_id, beverage_id } = request.params
  Promise.all([ Order.removeBeverage( order_id, beverage_id ) ])
  .then( response.redirect( `/order/details/${customer_id}/${order_id}` ) )
})

module.exports = router
