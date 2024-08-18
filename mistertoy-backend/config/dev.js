import dotenv from 'dotenv'
dotenv.config()

export default {
  dbURL: 'mongodb://127.0.0.1:27017',
  dbName: 'toyTest_db',
  API_DEV: process.env.secret_api_key
}
