var env = require('dotenv').config();

module.exports = 
{
  "development": {
    "username": process.env.db_username,
    "password": process.env.db_password,
    "database": "recommendations_db",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.production_username,
    "password": process.env.production_password,
    "database": "cw083bzebvkmxzne",
    "host": process.env.production_host,
    "dialect": "mysql"
  }
}

