import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbHost = process.env.MYSQLHOST || 'localhost'
const isProduction = process.env.NODE_ENV === 'production'

const productionDbUrl = process.env.PRODUCTION_DB_URL || 'production_db_connection_string'
const developmentDbUrl = process.env.DEVELOPMENT_DB_URL || 'development_db_connection_string'

// Checking modes
const dbUrl = isProduction ? productionDbUrl : developmentDbUrl;

const db = new Sequelize(dbUrl, {
    host: dbHost,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    dialectOptions: {
        connectTimeout: 60000,
    },
    logging: isProduction ? false : true,
})

// Test the connection and handle any errors
async function testDBConnection() {
    try {
        await db.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

testDBConnection()

export { db }
