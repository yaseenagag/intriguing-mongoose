const { Beverage } = require('../beverageDB')

const beverage = {

  getAll: ( request, response, next ) => {
    Beverage.getAll()
    .then( data => {
      response.status(200)
      .json({
           status: 'success',
           data: data,
           message: 'Retrieved ALL beverages'
         })
     })
     .catch( (err) => {
       return next(err)
     })
  },

  getOne: ( request, response, next ) => {
    const { id } = request.params
    Beverage.getById( id )
    .then( data => {
      response.status(200)
      .json({
            status: 'success',
            data: data,
            message: 'Retrieved one beverage'
      })
    })
    .catch( err => {
      return next(err)
    })
  },

  add: ( request, response, next ) => {
    const { name, manufacturer, supplier, price } = request.body
    Beverage.add( name, manufacturer, supplier, price )
    .then( data => {
      response.status(200)
      .json({
            status: 'success',
            data: data,
            message: 'Created new beverage.'
          })
    })
    .catch( err => {
        return next(err)
    })
  },

  update: ( request, response, next ) => {
    const { name, manufacturer, supplier, price } = request.body
    const { id } = request.params
    Beverage.api_update( id, name, manufacturer, supplier, price )
    .then( () => {
      response.status(200)
      .json({
          status: 'success',
          message: 'Updated beverage'
            })
    })
    .catch( error => {
      return next( error )
    })
  },

  delete: ( request, response, next ) => {
    const { id } = request.params
    Beverage.delete( id )
    .then( () => {
      response.status(200)
      .json({
        status: 'success',
        message: 'Deleted the drink!'
      })
    })
    .catch( error => {
      return next( error )
    })
  }
}

module.exports = beverage
