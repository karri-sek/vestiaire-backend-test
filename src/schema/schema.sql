create table item
(
id int generated always as identity primary key,
item_name text,
updated_at timestamptz default current_timestamp,
price_currency text,
price_amount integer
);

create table sold_item
(
id int generated always as identity primary key,
item_id text,
no_of_items integer,
seller_reference text,
updated_at timestamptz default current_timestamp
);

create table seller
(
id int generated always as identity primary key,
seller_reference text,
seller_location text,
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