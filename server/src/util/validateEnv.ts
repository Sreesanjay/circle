import { cleanEnv, port, str } from 'envalid'

const env = cleanEnv(process.env, {
  PORT : port(),
  MONGO_CONNECTION_STRING : str(),
  JWT_SECRET : str(),

})

export default env;