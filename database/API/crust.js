const db = require('../mainDB')
const { Crust } = require('../custom_pizzaDB')

const crust = {

  add: ( request, response, next ) => {
    const { name, price } = request.body
    Crust.add( name, price )
    .then( () => {
      response.status(200)
      .json({
              status: 'success',
              message: 'Added new crust type'
            })
    })
    .catch( error => next( error ))
  },

  getAll: ( request, response, next ) => {
    Crust.getAll()
    .then( data => {
      response.status(200)
      .json({
           status: 'success',
           data: data,
           message: 'Retrieved ALL crusts'
         })
     })
     .catch( error => next( error ))
  },

  getOne: ( request, response, next ) => {
    const { id } = request.params
    Crust.getById( id )
    .then( data => {
      response.status(200)
      .json({
              status: 'success',
              data: data,
              message: 'Retrieved one crust'
            })
    })
    .catch( error => next( error ))
  },

  update: ( request, response, next ) => {
    const { id } = request.params
    const { name, price } = request.body

    Crust.api_update( id, name, price )
    .then( () => {
      response.status(200)
      .json({
              status: 'success',
              message: 'Updated crust entry.'
            })
    })
    .catch( error => next( error ))
  },

  delete: ( request, response, next ) => {
    const { id } = request.params
    Crust.delete( id )
    .then( () => {
      response.status(200)
      .json({
              status: 'success',
              message: 'Deleted crust type.'
            })
    })
    .catch( error => next( error ))
  }


}

module.exports = crust
