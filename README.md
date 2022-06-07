## Description

Created using NodeJs, ExpressJs, Mongo and Mongoose.

## Version Info

Node - v14.17.6
NPM - v6.14.15
Express - v4.18.1
Mongoose - v6.3.3

## Installation

1. npm install
2. npm start
3. project will start on port 8080

## Environment Variables

The environment variables can be found and modified in the `.env` file.


# Port number
PORT=8080

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/yourdbname

# ACCESS_TOKEN_SECRET
ACCESS_TOKEN_SECRET=7fa9af8f7eecf8e3b238320a70c595a107c99a92f12075f66ad1f6a67b1c642a64adc1578dc941a012561e44b136e021270126d766bdf55709d145ae4c659a36

ACCESS_TOKEN_SECRET in dotEnv created using require('crypto').randomBytes(64).toString('hex')
crypto package comes in-built in NodeJs.

## Project Structure

  src/

    config/(Database Config)
    controllers/(controller to be called from route file)
    middleware/(middleware to be used from route)
    models/ (schema defination)
    routes/ (router file to be called form server file)

    server.js (main server file)