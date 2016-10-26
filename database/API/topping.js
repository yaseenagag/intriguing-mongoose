const db = require('../mainDB')
const { Topping } = require('../custom_pizzaDB')

const topping = {
  getAll: ( request, response, next ) => {
    Topping.getAll()
    .then( data => {
      response.status(200)
      .json({
           status: 'success',
           data: data,
           message: 'Retrieved ALL toppings'
         })
     })
     .catch( (err) => {
       return next(err)
     })
  },
  add: ( request, response, next ) => {
    const { name, price } = request.body
    Topping.add( name, price )
    .then( () => {
        response.status(200)
      .json({
          status: 'success',
          message: 'Added topping'
          })
    })
    .catch( err => {
      return next(err)
    })

  },
  getOne: ( request, response, next ) => {
    const { id } = request.params
    Topping.getById( id )
    .then( data => {
      response.status(200)
      .json({
              status: 'success',
              data: data,
              message: 'Retrieved single topping'
            })
    })
  },
  update: ( request, response, next ) => {
    const { id } = request.params
    const { name, price } = request.body

    Topping.api_update( id, name, price )
    .then( () => {
      response.status(200)
      .json({
              status: 'succes',
              message: 'Updated Topping entry.'
            })
    })
    .catch( error => next( error ))
  },
  delete: ( request, response, next ) => {
    const { id } = request.params
    Topping.delete( id )
    .then( () => {
      response.status(200)
      .json({
              status: 'success',
              message: 'Deleted topping.'
            })
    })
    .catch( error => next( error ))
  }

}

module.exports = topping
