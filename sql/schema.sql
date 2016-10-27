


-- dropdb intriguing-mongoose
-- createdb intriguing-mongoose
-- psql intriguing-mongoose < schema.sql


CREATE TABLE "topping" (
"id"  SERIAL NOT NULL ,
"name" VARCHAR(80) NOT NULL DEFAULT 'NULL' ,
"price" MONEY,
PRIMARY KEY ("id")
);

CREATE TABLE "crust" (
"id"  SERIAL NOT NULL ,
"name" VARCHAR(80) NOT NULL DEFAULT 'NULL' ,
"price" MONEY ,
PRIMARY KEY ("id")
);

CREATE TABLE "custom_pizza" (
"id"  SERIAL NOT NULL ,
"price" MONEY NOT NULL ,
PRIMARY KEY ("id")
);

CREATE TABLE "specialty_pizza" (
"id"  SERIAL NOT NULL ,
"description" TEXT ,
"price" MONEY ,
PRIMARY KEY ("id")
);

CREATE TABLE "beverage" (
"id"  SERIAL NOT NULL ,
"name" VARCHAR(80) ,
"manufacturer" VARCHAR(80) ,
"supplier" VARCHAR(80) ,
"price" MONEY NOT NULL ,
PRIMARY KEY ("id")
);

CREATE TABLE "order_data" (
"id"  SERIAL NOT NULL ,
"price" MONEY ,
PRIMARY KEY ("id")
);

CREATE TABLE "transaction" (
"id"  SERIAL NOT NULL ,
"date" TIMESTAMP WITH TIME ZONE,
"delivery_address" VARCHAR(80) ,
"order_id" INTEGER ,
PRIMARY KEY ("id")
);

CREATE TABLE "payment_cards" (
"id"  SERIAL NOT NULL ,
"card_type" TEXT DEFAULT 'NULL',
"card_number" VARCHAR(80) DEFAULT 'NULL' ,
"expiration_date" VARCHAR(80) DEFAULT 'NULL' ,
"csv" INTEGER ,
"cardholder_name" VARCHAR(80) DEFAULT 'NULL' ,
PRIMARY KEY ("id")
);


CREATE TABLE "customer" (
"id"  SERIAL NOT NULL ,
"name" VARCHAR(80) ,
"address" VARCHAR(80) ,
"phone_number" TEXT ,
PRIMARY KEY ("id")
);

CREATE TABLE "account" (
"id"  SERIAL NOT NULL ,
"username" VARCHAR(80) NOT NULL DEFAULT 'NULL' ,
"password" VARCHAR(90) NOT NULL DEFAULT 'NULL' ,
PRIMARY KEY ("id")
);

CREATE TABLE "pizza_toppings" (
"pizza_id"  SERIAL ,
"topping_id" INTEGER
);

CREATE TABLE "pizza_crusts" (
"pizza_id"  SERIAL ,
"crust_id" INTEGER
);

CREATE TABLE "ordered_specialty_pizzas" (
"order_id"  SERIAL ,
"pizza_id" INTEGER
);

CREATE TABLE "ordered_custom_pizzas" (
"order_id"  SERIAL ,
"pizza_id" INTEGER
);

CREATE TABLE "ordered_beverages" (
"order_id"  SERIAL ,
"beverage_id" INTEGER
);

CREATE TABLE "transaction_payments" (
"transaction_id"  SERIAL ,
"payment_id" INTEGER
);

CREATE TABLE "customer_transactions" (
"customer_id"  SERIAL ,
"transaction_id" INTEGER
);

CREATE TABLE "cards_on_file" (
"customer_id"  SERIAL ,
"card_id" INTEGER
);

CREATE TABLE "customer_accounts" (
"customer_id"  SERIAL ,
"account_id" INTEGER
);

ALTER TABLE "transaction" ADD FOREIGN KEY ("order_id") REFERENCES "order_data" ("id");
ALTER TABLE "pizza_toppings" ADD FOREIGN KEY ("pizza_id") REFERENCES "custom_pizza" ("id");
ALTER TABLE "pizza_toppings" ADD FOREIGN KEY ("topping_id") REFERENCES "topping" ("id");
ALTER TABLE "pizza_crusts" ADD FOREIGN KEY ("pizza_id") REFERENCES "custom_pizza" ("id");
ALTER TABLE "pizza_crusts" ADD FOREIGN KEY ("crust_id") REFERENCES "crust" ("id");
ALTER TABLE "ordered_specialty_pizzas" ADD FOREIGN KEY ("order_id") REFERENCES "order_data" ("id");
ALTER TABLE "ordered_specialty_pizzas" ADD FOREIGN KEY ("pizza_id") REFERENCES "specialty_pizza" ("id");
ALTER TABLE "ordered_custom_pizzas" ADD FOREIGN KEY ("order_id") REFERENCES "order_data" ("id");
ALTER TABLE "ordered_custom_pizzas" ADD FOREIGN KEY ("pizza_id") REFERENCES "custom_pizza" ("id");
ALTER TABLE "ordered_beverages" ADD FOREIGN KEY ("order_id") REFERENCES "order_data" ("id");
ALTER TABLE "ordered_beverages" ADD FOREIGN KEY ("beverage_id") REFERENCES "beverage" ("id");
ALTER TABLE "transaction_payments" ADD FOREIGN KEY ("transaction_id") REFERENCES "transaction" ("id");
ALTER TABLE "transaction_payments" ADD FOREIGN KEY ("payment_id") REFERENCES "payment_cards" ("id");
ALTER TABLE "customer_transactions" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");
ALTER TABLE "customer_transactions" ADD FOREIGN KEY ("transaction_id") REFERENCES "transaction" ("id");
ALTER TABLE "cards_on_file" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");
ALTER TABLE "cards_on_file" ADD FOREIGN KEY ("card_id") REFERENCES "payment_cards" ("id");
ALTER TABLE "customer_accounts" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");
ALTER TABLE "customer_accounts" ADD FOREIGN KEY ("account_id") REFERENCES "account" ("id");
