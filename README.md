# -coding-test
this repo contains the coding test for  backend node js test
# how to run:

## yarn db
above command creates a db and initialize all the entities

## yarn start
will start the server and end points at port 3000

### some endpoints

1) GET http://localhost:3000/items/
2) POST http://localhost:3000/sold-items
payload: `[{"item_id": 4, "no_of_items": 5, "seller_reference": "ABC"}]`

I have added a nice frontend for this application and code base is at the repo:

frontend repo: https://github.com/karri-sek/splitArray
### how to run the front-end
1) npm start
above command will ask for port change if you are running the backend at the same time. please type Y and proceed to view the payouts. 

Currently I set the limit as 8000, on the front end side you can see the payouts for Amazon and buyers-buyers with splits.

.....more to come , please bare with me.
