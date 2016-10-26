const db = require('./mainDB')

const Specialty_pizza = {

  add: ( description, price ) => db.none( `INSERT INTO specialty_pizza ( description, price ) VALUES ( '${description}', '${price}' )` ),
  getAll: () => db.any( `SELECT * FROM specialty_pizza` ),
  getById: specialty_pizza_id => db.one( `SELECT * FROM specialty_pizza WHERE id = ${specialty_pizza_id}` ),
  api_update: ( id, description, price ) => db.none( `UPDATE specialty_pizza SET description='${description}', price=${price} WHERE id = ${id}` ),
  update: ( id, description, price ) => {
          let sql =                       `BEGIN TRANSACTION;`
          if ( description != '' ) sql += `UPDATE specialty_pizza SET description='${description}' WHERE id = '${id}';`
          if ( price != '' ) sql +=       `UPDATE specialty_pizza SET price='${price}' WHERE id = '${id}';`
          sql +=                          `COMMIT;`
          db.none( sql ) },
  delete: id => db.none( `DELETE FROM specialty_pizza WHERE id = '${id}'` ),
  getPrice: pizza_id => db.one( `SELECT price FROM specialty_pizza WHERE id = '${specialty_pizza_id}'` )

}

module.exports = { Specialty_pizza }
