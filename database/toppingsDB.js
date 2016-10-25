const db = require( './mainDB' )


const Topping = {

  add: ( name, price ) => db.none( `INSERT INTO topping ( name, price ) VALUES ( '${name}', '${price}' )` ),
  getAll: () => db.any( `SELECT * FROM topping` ),
  getById: id => db.one( `SELECT * FROM topping WHERE id=${id}` ),
  getNames: () => db.any( `SELECT name FROM topping` ),
  update: ( id, name = '', price = '' ) => {
          let sql =               `BEGIN TRANSACTION;`
          if (name != '') sql +=  `UPDATE topping SET name='${name}' WHERE id = ${id};`
          if (price != '') sql += `UPDATE topping SET price='${price}' WHERE id = ${id};`
          sql +=                  `COMMIT;`
          db.none( sql ) },
  delete: id => db.none( `DELETE FROM topping WHERE id=${id}` )


}

module.exports = { Topping }
