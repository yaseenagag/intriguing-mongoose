const express = require('express')
const router = express.Router()
const { Customer } = require('../database/customerDB')

router.get('/', ( request, response ) => {
  Promise.all([ Customer.getAll() ])
  .then( r_customers => {
    response.render( 'opening-page', { customerList: r_customers[0] } )
  })

})

router.get( '/admin', ( request, response ) =>{
  response.render( 'index' )
})

module.exports = router;
