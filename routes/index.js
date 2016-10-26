const express = require('express')
const router = express.Router()
const { Customer } = require('../database/customerDB')
const { Specialty_pizza } = require('../database/specialty_pizzaDB')
const { Api } = require('../database/apiDB')

router.get('/', ( request, response ) => {
  Promise.all([ Customer.getAll() ])
  .then( r_customers => {
    response.render( 'opening-page', { customerList: r_customers[0] } )
  })
})

router.get( '/admin', ( request, response ) =>{
  response.render( 'index' )
})

router.get('/api/specialty_pizzas', Api.getAllSpecialties)

module.exports = router;
