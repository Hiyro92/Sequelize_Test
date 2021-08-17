const path = require("path")
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {  
    dialect: "sqlite",
    storage: path.join(__dirname, "../database/development.db")
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}

module.exports = config[env]
