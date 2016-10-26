const express = require('express');
const router = express.Router();
const { Crust } = require('../database/custom_pizzaDB')

router.get( '/add', ( request, response ) => response.render( 'pizza_crusts/add' ))

router.post( '/add', ( request, response ) => {
  const { name, price } = request.body
  Promise.all([ Crust.add( name, price ) ])
  .then( response.redirect( '/crusts/' ) )
})

router.get( '/', ( request, response ) => {
  Promise.all([ Crust.getAll() ])
  .then( data => {
    response.render( 'pizza_crusts/index', { crusts: data[0] })
  })
})

router.get( '/edit/:crust_id', ( request, response ) => {
  const { crust_id } = request.params
  Promise.all([ Crust.getById( crust_id ) ])
  .then( data => {
    response.render( 'pizza_crusts/edit', { crust: data[0] } )
  })
})

router.post( '/edit/:crust_id', ( request, response ) => {
  const { crust_id } = request.params
  const { name, price } = request.body

  Promise.all([ Crust.update( crust_id, name, price ) ])
  .then( response.redirect( '/crusts/' ) )
})

router.get( '/delete/:crust_id', ( request, response ) => {
  const { crust_id } = request.params
  Promise.all([ Crust.getById( crust_id ) ])
  .then( data => response.render( 'pizza_crusts/delete', { crust: data[0] } ) )
})

router.post( '/delete/:crust_id', ( request, response ) => {
  const { crust_id } = request.params
  Promise.all([ Crust.delete( crust_id ) ])
  .then( response.redirect( '/crusts/' ) )
})

module.exports = router
