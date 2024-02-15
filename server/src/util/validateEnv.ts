import { cleanEnv, port, str } from 'envalid'

const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_CONNECTION_STRING: str(),
  JWT_ACCESSTOKEN_SECRET: str(),
  JWT_REFRESHTOKEN_SECRET: str()
})

export default env;