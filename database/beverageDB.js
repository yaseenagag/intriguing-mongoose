const db = require('./mainDB')

const Beverage = {
  add: ( name, manufacturer, supplier, price ) => db.one( `INSERT INTO beverage ( name, manufacturer, supplier, price ) VALUES ( '${name}', '${manufacturer}', '${supplier}', ${price} ) RETURNING id` ),
  //add: ( name, manufacturer, supplier, price ) => db.none( `INSERT INTO beverage ( name, manufacturer, supplier, price ) VALUES ( '${name}', '${manufacturer}', '${supplier}', ${price} )` ),
  getAll: () => db.any( `SELECT * FROM beverage` ),
  getById: id => db.one( `SELECT * FROM beverage WHERE id = ${id}` ),
  api_update: (id, name, manufacturer, supplier, price) => db.none( `UPDATE beverage SET name='${name}', manufacturer='${manufacturer}', supplier='${supplier}', price='${price}' WHERE id = ${id}` ),
  update: ( id, name, manufacturer, supplier, price ) => {
          let sqlString =                       `BEGIN TRANSACTION;`
          if( name != '' ) sqlString +=         `UPDATE beverage SET name='${name}' WHERE id = ${id};`
          if( manufacturer != '') sqlString +=  `UPDATE beverage SET manufacturer='${manufacturer}' WHERE id = ${id};`
          if( supplier != '') sqlString +=      `UPDATE beverage SET supplier='${supplier}' WHERE id = ${id};`
          if( price != '') sqlString +=         `UPDATE beverage SET price=${price} WHERE id = ${id};`
          sqlString +=                          `COMMIT;`
          db.none( sqlString )},
  delete: id => db.none( `DELETE FROM beverage WHERE id = ${id}` )

}

module.exports = { Beverage }
