const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');
const toppings = require('./routes/toppings')
const crusts = require('./routes/crusts')
const custom_pizzas = require('./routes/custom_pizza')
const beverage = require('./routes/beverage')
const specialty_pizza = require('./routes/specialty_pizza')
const order_route = require('./routes/orders')
const customer = require('./routes/customer')
const transaction = require('./routes/transaction')
const payment = require('./routes/payment')


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes )
app.use('/order', order_route )
app.use('/users', users )
app.use('/toppings', toppings )
app.use('/crusts', crusts )
app.use('/custom_pizza', custom_pizzas )
app.use('/beverage', beverage )
app.use('/specialty_pizza', specialty_pizza )
app.use('/customer', customer )
app.use('/transaction', transaction )
app.use('/payment', payment )

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use( ( err, req, res, next ) => {
    res.status(err.status || 500)
    .json({
     status: 'error',
     message: err
    })
  })
}


// production error handler
// no stacktraces leaked to user
app.use( (err, req, res, next) => {
  res.status(err.status || 500)
  .json({
   status: 'error',
   message: err
  })
});


module.exports = app;
