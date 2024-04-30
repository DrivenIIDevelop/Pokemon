import mongoose from 'mongoose'

export function mongooseConnect() {
  const uri = process.env.MongoDB_URI
  if (!uri) {
    throw new Error('MongoDB_URI is not defined in the environment variables.')
  }

  if (mongoose.connection.readyState === 1) {
    throw Promise.resolve(mongoose.connection)
  } else {
    return mongoose.connect(uri)
  }
}
