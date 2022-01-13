create table item
(
id int generated always as identity primary key,
item_name text,
price_currency text,
price_amount integer,
updated_at timestamptz default current_timestamp
);

create table seller
(
id int generated always as identity primary key,
seller_reference text,
seller_location text,
updated_at timestamptz default current_timestamp
);

create table sold_item
(
id int generated always as identity primary key,
item_name text,
no_of_items integer,
seller_reference text,
updated_at timestamptz default current_timestamp
);

create table payout
(
id int generated always as identity primary key,
seller_reference text,
amount integer,
currency text,
updated_at timestamptz default current_timestamp
);

insert into item(item_name, price_currency, price_amount) VALUES ('mac-pro', 'USD', 1900);
insert into item(item_name, price_currency, price_amount) VALUES ('iphone', 'USD', 1000);
insert into item(item_name, price_currency, price_amount) VALUES ('gimbel', 'USD', 200);
insert into item(item_name, price_currency, price_amount) VALUES ('desk-chair', 'USD', 500);
insert into item(item_name, price_currency, price_amount) VALUES ('dell-mouse', 'USD', 40);
insert into item(item_name, price_currency, price_amount) VALUES ('LED-tv', 'USD', 4900);
insert into item(item_name, price_currency, price_amount) VALUES ('microwave', 'USD', 690);
insert into item(item_name, price_currency, price_amount) VALUES ('e-scooter', 'USD', 700);
insert into item(item_name, price_currency, price_amount) VALUES ('digicam', 'USD', 900);
insert into item(item_name, price_currency, price_amount) VALUES ('ipad', 'USD', 800);



insert into seller(seller_reference, seller_location) VALUES ('Amazon', 'USA');
insert into seller(seller_reference, seller_location) VALUES ('ebay', 'USA');
insert into seller(seller_reference, seller_location) VALUES ('rs-sellers', 'Uxbridge, UK');
insert into seller(seller_reference, seller_location) VALUES ('ecommerce-sellers', 'USA');
insert into seller(seller_reference, seller_location) VALUES ('ecart-sellers', 'USA');
insert into seller(seller_reference, seller_location) VALUES ('b and b', 'USA');
insert into seller(seller_reference, seller_location) VALUES ('prime-sellers', 'USA');
insert into seller(seller_reference, seller_location) VALUES ('click-collect-sellers', 'USA');
insert into seller(seller_reference, seller_location) VALUES ('buyers-buyers', 'USA');


insert into sold_item(item_name, no_of_items,seller_reference) VALUES ('mac-pro', 5,'Amazon');
insert into sold_item(item_name, no_of_items,seller_reference) VALUES ('iphone', 3,'ebay');
insert into sold_item(item_name, no_of_items,seller_reference) VALUES ('LED-tv', 4,'rs-sellers');
insert into sold_item(item_name, no_of_items,seller_reference) VALUES ('microwave', 10,'ecommerce-sellers');
insert into sold_item(item_name, no_of_items,seller_reference) VALUES ('digicam', 6,'ecart-sellers');
insert into sold_item(item_name, no_of_items,seller_reference) VALUES ('e-scooter', 8,'b and b');
insert into sold_item(item_name, no_of_items,seller_reference) VALUES ('gimbel', 9,'prime-sellers');
insert into sold_item(item_name, no_of_items,seller_reference) VALUES ('desk-chair', 10,'click-collect-sellers');
insert into sold_item(item_name, no_of_items,seller_reference) VALUES ('ipad', 15,'buyers-buyers');
