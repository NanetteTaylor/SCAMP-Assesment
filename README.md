# SCAMP-Assesment

## Setup

### Dependencies

Run `npm install` on root folder to install dependencies related to the project.

### Database and Environment Prep
1. Create a database named `scampStore` in mysql
2. Edit `.env.example` file in project directory with your database details (Host, user, password)
3. Save the file as a `.env` file
4. Run `npm run migrate` in your **TERMINAL**, in the **root** folder of your project. This will create tables called `users`, `items` and `orders` in your database.
5. Run `npm start` to start your server on localhost, port 5000.

### Routes
| URI        | HTTP Method | Description      | Request Object  |Response and Notes|
| ---------- |:-----------:|:----------------:|:---------------:|:-------------:|
|/api/user/register|POST|Register a user|{"username": "salesperson","email": "sales@scampstore.com","password": "sales","role": "basic"} NB: User role can be either basic or admin|Returns a message on whether the user  has been registered or not|
|/api/user/login|POST|Login a registered user|{"email": "admin@scampstore.com","password": "admin"}|Returns a logged in message and an `auth-token` in the response header|
|/api/inventory/add|POST|Add an item to the inventory|{"name": "Apple Juice 1L","description": "Packed with vitamin A","price": 55,"quantity": 78} NB: Response header should include `auth-token` with the auth token returned at login|Returns feedback on whether item has been added or not|
|/api/inventory|GET|Returns all items in the inventory|NA|[{"item_id": 1,"name": "Orange Juice 1L","description": "Packed with vitamin C","price": 50,"quantity": 85},{"item_id": 2,"name": "Baked Beans","description": "Heinze peppery backed beans","price": 20,"quantity": 85}]|
|/api/inventory/update-quantity/:itemID/:newQuantity|PUT|Update the quantity for an inventory item|NA|Returns feedback message|
