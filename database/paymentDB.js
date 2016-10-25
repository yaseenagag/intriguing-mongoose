const db = require( './mainDB' )


const Payment = {

  add: ( card_type, card_number, expiration_date, csv, cardholder_name ) => db.one( `INSERT INTO payment_cards ( card_type, card_number, expiration_date, csv, cardholder_name ) VALUES ( '${card_type}', '${card_number}', '${expiration_date}', '${csv}', '${cardholder_name}' ) RETURNING id` ),
  getAll: () => db.any( `SELECT * FROM payment_cards` ),
  getById: id => db.one( `SELECT * FROM payment_cards WHERE id=${id}` ),
  joinCard: (customer_id, payment_id) => db.none(`INSERT INTO cards_on_file (customer_id, card_id) VALUES( ${customer_id}, ${payment_id})`),
  update: ( id, card_type = '', card_number = '', expiration_date = '', csv = '', cardholder_name = '' ) => {
          let sql =                           `BEGIN TRANSACTION;`
          if (card_type != '') sql +=         `UPDATE payment_cards SET card_type='${card_type}' WHERE id = ${id};`
          if (card_number != '') sql +=       `UPDATE payment_cards SET card_number='${card_number} WHERE id = ${id};'`
          if (expiration_date != '') sql +=   `UPDATE payment_cards SET expiration_date='${expiration_date}' WHERE id = ${id};`
          if (csv != '') sql +=               `UPDATE payment_cards SET csv='${csv}' WHERE id = ${id};`
          if (cardholder_name != '') sql +=   `UPDATE payment_cards SET cardholder_name='${cardholder_name}' WHERE id = ${id};`
          sql +=                              `COMMIT;`
          db.none( sql ) },
  delete: id => db.none( `DELETE FROM payment_cards WHERE id=${id}` )


}

module.exports = { Payment }
