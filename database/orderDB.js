const db = require('./mainDB')

const Order = {

  new: () => db.one( `INSERT INTO order_data ( price ) VALUES ( 0 ) RETURNING id` ),
  getAll: () => db.any( `SELECT * FROM order_data` ),
  getById: id => db.one( `SELECT * FROM order_data WHERE id = ${id}` ),

  getContents: order_id => db.any( `BEGIN TRANSACTION;
                                    SELECT pizza_id AS customP FROM ordered_custom_pizzas WHERE order_id=${order_id};
                                    SELECT pizza_id AS specialtyP FROM ordered_specialty_pizzas WHERE order_id=${order_id};
                                    SELECT beverage_id AS beverage FROM ordered_beverages WHERE order_id=${order_id};
                                    COMMIT;` ),

  getCustomPizzas: order_id => db.any( `SELECT pizza_id AS custom FROM ordered_custom_pizzas WHERE order_id=${order_id}` ),
  getSpecialtyPizzas: order_id => db.any( `SELECT pizza_id AS specialty FROM ordered_specialty_pizzas WHERE order_id=${order_id}` ),
  getBeverages: order_id => db.any( `SELECT beverage_id as beverage FROM ordered_beverages WHERE order_id=${order_id}` ),

  addCustomPizza: ( order_id, pizza_id ) => db.none( `INSERT INTO ordered_custom_pizzas ( order_id, pizza_id ) VALUES ( ${order_id}, ${pizza_id} )` ),
  addSpecialtyPizza: ( order_id, pizza_id ) => db.none( `INSERT INTO ordered_specialty_pizzas ( order_id, pizza_id ) VALUES ( ${order_id}, ${pizza_id} )` ),
  addBeverage: ( order_id, beverage_id ) => db.none( `INSERT INTO ordered_beverages ( order_id, beverage_id ) VALUES ( ${order_id}, ${beverage_id} )` ),

  removeCustomPizza: ( order_id, pizza_id ) => db.none( `DELETE FROM ordered_custom_pizzas WHERE order_id=${order_id} AND pizza_id=${pizza_id}` ),
  removeSpecialtyPizza: ( order_id, pizza_id ) => db.none( `DELETE FROM ordered_specialty_pizzas WHERE order_id=${order_id} AND pizza_id=${pizza_id}` ),
  removeBeverage: ( order_id, beverage_id ) => db.none( `DELETE FROM ordered_beverages WHERE order_id=${order_id} AND beverage_id=${beverage_id}` ),

  calcPrice: order_id => db.one(  `UPDATE order_data SET price =
                                  ( SELECT COALESCE(SUM(price), 0) FROM ordered_custom_pizzas JOIN custom_pizza ON ordered_custom_pizzas.pizza_id = custom_pizza.id WHERE ordered_custom_pizzas.order_id = ${order_id} )
                                    +
                                  ( SELECT COALESCE(SUM(price), 0) FROM ordered_specialty_pizzas JOIN specialty_pizza ON ordered_specialty_pizzas.pizza_id = specialty_pizza.id WHERE ordered_specialty_pizzas.order_id = ${order_id} )
                                    +
                                  ( SELECT COALESCE(SUM(price), 0) FROM ordered_beverages JOIN beverage ON ordered_beverages.beverage_id = beverage.id WHERE ordered_beverages.order_id = ${order_id} )
                                  WHERE id = ${order_id} RETURNING price` ),

  delete: order_id => db.none( `BEGIN TRANSACTION;
                                DELETE FROM pizza_toppings WHERE pizza_id = ( SELECT pizza_id FROM ordered_custom_pizzas WHERE order_id = ${order_id} );
                                DELETE FROM pizza_crusts WHERE pizza_id = ( SELECT pizza_id FROM ordered_custom_pizzas WHERE order_id = ${order_id} );
                                DELETE FROM custom_pizza WHERE id = ( SELECT pizza_id FROM ordered_custom_pizzas WHERE order_id = ${order_id} );
                                DELETE FROM ordered_custom_pizzas WHERE order_id = ${order_id};
                                DELETE FROM ordered_specialty_pizzas WHERE order_id = ${order_id};
                                DELETE FROM ordered_beverages WHERE order_id = ${order_id};
                                COMMIT;
                                ` )

}

module.exports = { Order }
