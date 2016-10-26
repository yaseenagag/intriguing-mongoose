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
  },

  getOne: ( request, response, next ) => {
    const { id } = request.params
    Specialty_pizza.getById( id )
    .then( data => {
      response.status(200)
      .json({
              status: 'success',
              data: data,
              message: 'Retrieved single specialty pizza'
            })
    })
  },

  add: ( request, response, next ) => {
    const { description, price } = request.body
    Specialty_pizza.add( description, price )
    .then( () => {
      response.status(200)
      .json({
              status: 'success',
              message: 'Successfully added a new specialty pizza.'
            })
    })
    .catch( error => next( error ))
  },

  update: ( request, response, next ) => {
    const { id } = request.params
    const { description, price } = request.body

    Specialty_pizza.api_update( id, description, price )
    .then( () => {
      response.status(200)
      .json({
              status: 'succes',
              message: 'Updated specialty pizza entry.'
            })
    })
    .catch( error => next( error ))
  },

  delete: ( request, response, next ) => {
    const { id } = request.params
    Specialty_pizza.delete( id )
    .then( () => {
      response.status(200)
      .json({
              status: 'success',
              message: 'Deleted specialty pizza.'
            })
    })
    .catch( error => next( error ))
  }
}
module.exports = specialty
