const express = require('express');
const router = express.Router();
const { Beverage } = require('../database/beverageDB')

router.get( '/add', ( request, response ) => {
  response.render( 'beverages/add' )
})

// router.post( '/add', ( request, response ) => {
//   const { name, manufacturer, supplier, price } = request.body
//   if( name === '' || manufacturer === '' || supplier === '' || price === '' ) {
//     //response.send( "No" )
//     response.render( 'beverages/add', { message: "All Fields are required." } )
//   } else {
//     Promise.all([ Beverage.add( name, manufacturer, supplier, price ) ])
//     .then( data => {
//       const bev_id = data[0].id
//       response.redirect( `/beverage/details/${bev_id}` )
//     })
//   }
// })


router.get( '/details/:bev_id', ( request, response ) => {
  const { bev_id } = request.params
  Promise.all([ Beverage.getById( bev_id ) ])
  .then( data => {
    response.render( 'beverages/details', { beverage: data[0] } )
  })
})

router.get( '/edit/:id', ( request, response ) => {
  const { id } = request.params
  Promise.all([ Beverage.getById( id ) ])
  .then( data => response.render( 'beverages/edit', { beverage: data[0] } ) )
})

router.post( '/edit/:id', ( request, response ) => {
  const { id } = request.params
  const { name, manufacturer, supplier, price } = request.body

  Promise.all([ Beverage.update( id, name, manufacturer, supplier, price ) ])
  .then( response.redirect( `/beverage/details/${id}` ) )
})

router.get('/:customer_id/:order_id', ( request, response ) => {
  const { customer_id, order_id } = request.params

  Promise.all([ Beverage.getAll() ])
  .then( data => response.render('beverages/index', { beverages: data[0],
                                                      customer_id: customer_id,
                                                      order_id: order_id}) )
})


router.get( '/delete/:id', ( request, response ) => {
  const { id } = request.params
  Promise.all([ Beverage.getById( id ) ])
  .then( data => {
    response.render( `beverages/delete`, { beverage: data[0] } )
  })
})

router.post( '/delete/:id', ( request, response ) => {
  const { id } = request.params
  Promise.all([ Beverage.delete( id ) ])
  .then( response.redirect('/beverage/') )
})

module.exports = router;
