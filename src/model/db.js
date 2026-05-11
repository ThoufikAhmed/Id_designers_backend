const mysql = require('mysql2')

// 🔹 MySQL Connection Pool
const mySqlPool = mysql.createPool({
  connectionLimit: 500,
  host: process.env.DB_MYSQL_HOST,
  user: process.env.DB_MYSQL_USERNAME,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DBNAME,
  port: process.env.DB_MYSQL_PORT,
  multipleStatements: true
})

// 🔹 Close MySQL Pool If No Active Connections After 5 mins
let mysqlTimeout

const closeMySqlPool = () => {
  clearTimeout(mysqlTimeout)

  mysqlTimeout = setTimeout(() => {
    if (
      !mySqlPool._allConnections.length &&
      !mySqlPool._freeConnections.length
    ) {
      mySqlPool.end(err => {
        if (err) {
          console.error('Error closing MySQL pool:', err)
        } else {
          console.log('MySQL pool closed.')
        }
      })
    }
  }, 300000)
}

// 🔹 MySQL Helpers
const mysqlHelpers = {
  runQuery: (query) =>
    new Promise((resolve, reject) => {
      mySqlPool.query(query, (err, results) => {
        if (err) {
          return reject(err)
        }

        closeMySqlPool()
        resolve(results)
      })
    }),

  runQueryWithParameters: (query, ...parameters) =>
    new Promise((resolve, reject) => {
      mySqlPool.query(query, parameters, (err, results) => {
        if (err) {
          return reject(err)
        }

        closeMySqlPool()
        resolve(results)
      })
    })
}

module.exports = { mysqlHelpers }