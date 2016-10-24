const db = require('./mainDB')

const CustomPizza = {

  add: ( crust_id ) => db.one( `INSERT INTO custom_pizza ( price ) VALUES ( (SELECT price FROM crust WHERE id = '${crust_id}' ) ) RETURNING id` ),

  addTopping: ( pizza_id, topping_id ) => db.none( `INSERT INTO pizza_toppings ( pizza_id, topping_id ) VALUES ( ${pizza_id}, ${topping_id} ) ` ),
  addCrust: ( pizza_id, crust_id ) => db.none( `INSERT INTO pizza_crusts ( pizza_id, crust_id ) VALUES ( ${pizza_id}, ${crust_id} )` ),
  deleteTopping: ( pizza_id, topping_id ) => db.none( `DELETE FROM pizza_toppings WHERE pizza_id = ${pizza_id} AND topping_id = ${topping_id}` ),
  getAll: () => db.any(  `SELECT * FROM custom_pizza` ),
  getPrice: pizza_id => db.one( `SELECT price FROM custom_pizza WHERE id = '${pizza_id}'` ),

  getCrust: pizza_id => db.oneOrNone( `SELECT name FROM crust JOIN pizza_crusts ON crust.id=pizza_crusts.crust_id WHERE pizza_crusts.pizza_id = ${pizza_id}` ),
  getToppings: pizza_id => db.any( `SELECT * FROM topping JOIN pizza_toppings ON topping.id = pizza_toppings.topping_id WHERE pizza_toppings.pizza_id = ${pizza_id}` ),

  calcPrice: pizza_id => db.one( `UPDATE custom_pizza SET price =
                                  ( SELECT COALESCE(price, 0) FROM crust WHERE id = (SELECT crust_id FROM pizza_crusts WHERE pizza_id=${pizza_id}) )
                                    +
                                  ( SELECT COALESCE(SUM(price), 0) FROM topping JOIN pizza_toppings ON topping.id = pizza_toppings.topping_id WHERE pizza_toppings.pizza_id = ${pizza_id})
                                  WHERE id = ${pizza_id} RETURNING price` )

}

module.exports = { CustomPizza }
