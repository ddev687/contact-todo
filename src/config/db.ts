
import mongoose from 'mongoose'
import config from './'

mongoose.connect(config.mongoUrl, {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
}).then(() => {
  console.log('Connection to MongoDB successful!')
}).catch((err: any) => {
  console.error('Error in connection to MongoDB', err.stack)
})

export default mongoose;