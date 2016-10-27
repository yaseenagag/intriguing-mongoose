const { Customer } = require('../customerDB')

const customer = {

  getAll: ( request, response, next ) =>  {
    Customer.getAll()
    .then( data => {
      response.status(200)
      .json({
              status: 'success',
              data: data,
              message: 'Retrieved all customers.'
            })
    })
    .catch( error => next( error ))
  },

  getOne: ( request, response, next ) => {
    const { id } = request.params
    Customer.getById( id )
    .then( data => {
      response.status(200)
      .json({
              status: 'success',
              data: data,
              message: 'Retrieved single customer.'
            })
    })
    .catch( error => next( error ))
  },

  add: ( request, response, next ) => {
    const { name, address, phone_number } = request.body
    Customer.add( name, address, phone_number )
    .then( data => {
      response.status(200)
      .json({
              status: 'success',
              data: data,
              message: 'Added new customer.'
            })
    })
    .catch( error => next( error ))
  },

  update: ( request, response, next ) => {
    const { id } = request.params
    const { name, address, phone_number } = request.body
    Customer.api_update( id, name, address, phone_number )
    .then( () => {
      response.status(200)
      .json({
              status: 'success',
              message: 'Updated customer.'
            })
    })
    .catch( error => next( error ))
  },

  delete: ( request, response, next ) => {
    const { id } = request.params
    Customer.delete( id )
    .then( () => {
      response.status(200)
      .json({
              status: 'success',
              message: 'Customer deleted.'
            })
    })
    .catch( error => next( error ))
  }


}

module.exports = customer
