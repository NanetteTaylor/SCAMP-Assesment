# SCAMP-Assesment

## Setup

### Dependencies

Run `npm install` on root folder to install dependencies related to the project.

### Database and Environment Prep
1. Create a database named `scampStore` in mysql
2. Edit `.env.example` file in project directory with your database details (Host, user, password)
3. Save the file as a `.env` file
4. Run `npm run migrate` in your **TERMINAL**, in the **root** folder of your project. This will create tables called `users`, `items` and `orders` in your database.
5. Run `npm start` to start your server on localhost, port 3000.

### Routes
| URI        | HTTP Method | Description      | Request Object  |Response and Notes|
| ---------- |:-----------:|:----------------:|:---------------:|:-------------:|
|/api/user/register|POST|Register a user|{"username": "salesperson","email": "sales@scampstore.com","password": "sales","role": "basic"}|Returns a message on whether the user  has been registered or not|
|