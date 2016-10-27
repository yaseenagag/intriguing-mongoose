const db = require('./mainDB')

const API = {
  specialty: require('./API/specialty_pizza'),
  topping: require('./API/topping'),
  crust: require('./API/crust'),
  beverage: require('./API/beverage'),
  customer: require('./API/customer')

}

module.exports = API
