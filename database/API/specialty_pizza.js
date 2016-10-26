const db = require('../mainDB')
const { Specialty_pizza } = require('../specialty_pizzaDB')

const specialty = {

  getAll: ( request, response, next ) => {
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
module.exports = specialty
