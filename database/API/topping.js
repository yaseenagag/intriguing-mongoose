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
    const { name } = request.body
    Topping.add( name )
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

  }
}

module.exports = topping
