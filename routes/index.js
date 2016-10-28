const express = require('express')
const router = express.Router()
const { Customer } = require('../database/customerDB')
const API = require('../database/apiDB')

router.get('/', ( request, response ) => {
  Promise.all([ Customer.getAll() ])
  .then( r_customers => {
    response.render( 'opening-page', { customerList: r_customers[0] } )
  })
})

router.get( '/admin', ( request, response ) =>{
  response.render( 'index' )
})

router.get('/api/report/sales', API.Sales.total )
router.get('/api/report/sales/topping', API.Sales.topping.total )
router.get('/api/report/sales/topping/:name', API.Sales.topping.by_name )
router.get('/api/report/sales/crust', API.Sales.crust.total )
router.get('/api/report/sales/crust/:id', API.Sales.crust.by_id )
router.get('/api/report/sales/custom_pizza', API.Sales.custom_pizza.total )
router.get('/api/report/sales/specialty_pizza', API.Sales.specialty_pizza.total )
router.get('/api/report/sales/specialty_pizza/:id', API.Sales.specialty_pizza.by_id )
router.get('/api/report/sales/beverage', API.Sales.beverage.total )
router.get('/api/report/sales/beverage/:id', API.Sales.beverage.by_id )
router.get('/api/report/sales/customer/:id', API.Sales.customer.by_id )

router.get('/api/specialty_pizza', API.specialty.getAll )
router.get('/api/specialty_pizza/:id', API.specialty.getOne )
router.post('/api/specialty_pizza', API.specialty.add )
router.put('/api/specialty_pizza/:id', API.specialty.update )
router.delete('/api/specialty_pizza/:id', API.specialty.delete )

router.get('/api/topping', API.topping.getAll )
router.get('/api/topping/:id', API.topping.getOne )
router.post('/api/topping', API.topping.add )
router.put('/api/topping/:id', API.topping.update )
router.delete('/api/topping/:id', API.topping.delete )

router.get('/api/crust', API.crust.getAll )
router.get('/api/crust/:id', API.crust.getOne )
router.post('/api/crust', API.crust.add )
router.put('/api/crust/:id', API.crust.update )
router.delete('/api/crust/:id', API.crust.delete )

router.get('/api/beverage', API.beverage.getAll )
router.get('/api/beverage/:id', API.beverage.getOne )
router.post('/api/beverage', API.beverage.add )
router.put('/api/beverage/:id', API.beverage.update )
router.delete('/api/beverage/:id', API.beverage.delete )

router.get('/api/customer', API.customer.getAll )
router.get('/api/customer/:id', API.customer.getOne )
router.post('/api/customer', API.customer.add )
router.put('/api/customer/:id', API.customer.update )
router.delete('/api/customer/:id', API.customer.delete )

module.exports = router
