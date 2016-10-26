const db = require('./mainDB')
const { Specialty_pizza } = require('../database/specialty_pizzaDB')

const Api = {

  getAllSpecialties: ( request, response, next ) => {
    Specialty_pizza.getAll()
    .then( data => {
      response.status(200)
      .json({
           status: 'success',
           data: data,
           message: 'Retrieved ALL specialty_pizzas'
         })
     })
     .catch( (err) => {
       return next(err)
     })
  }
}
module.exports = { Api }
