const express = require('express');
const router = express.Router();
const db = require('../database/mainDB')
const { Topping } = require( '../database/toppingsDB' )


router.get( '/add', ( request, response ) => {
    response.render('toppings/add-topping')
})

router.post( '/add', ( request, response ) => {
  const { name, price } = request.body

  Promise.all([ Topping.add( name, price ) ])
  .then( response.redirect('/toppings/') )
})

router.get( '/', ( request, response ) => {
  Promise.all([ Topping.getAll() ]).then( toppings => {
    response.render('toppings/index.pug', { toppings: toppings[0] })
  })
})

router.get( '/edit/:topping_id', ( request, response ) => {
  const { topping_id } = request.params

  Promise.all([ Topping.getById( topping_id ) ]).then( data => {
    response.render( 'toppings/edit-topping', { topping: data[0]} )
  })
})

router.post( '/edit/:topping_id', ( request, response ) => {
  const { topping_id } = request.params
  const { name, price} = request.body

  Promise.all([ Topping.update( topping_id, name, price) ])
  .then( response.redirect( '/toppings/' ) )

})

router.get( '/delete/:topping_id', ( request, response ) => {
  const { topping_id } = request.params

  Promise.all([ Topping.getById( topping_id ) ]).then( data => {
      response.render( 'toppings/delete-topping', { topping: data[0] } )
  })
})

router.post( '/delete/:topping_id', ( request, response ) => {
  const { topping_id } = request.params

  Promise.all([ Topping.delete( topping_id ) ]).then( data => {
      response.redirect( '/toppings/' )
  })
})

module.exports = router;
