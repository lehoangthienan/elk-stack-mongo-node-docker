import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.GDT_BACKEND_PORT,
  MONGO_URL: process.env.GDT_MONGO_URL,
  ELASTIC_HOST: process.env.ELASTIC_HOST,
  ELASTIC_LOG: process.env.ELASTIC_LOG,
  ELASTIC_VERSION: process.env.ELASTIC_VERSION,
}