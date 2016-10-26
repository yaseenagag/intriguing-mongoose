const db = require('../mainDB')
const { Crust } = require('../custom_pizzaDB')

const crust = {

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
     .catch( (err) => {
       return next(err)
     })
  }


}

module.exports = crust
