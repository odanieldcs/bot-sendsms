import dotenv from 'dotenv'
import mongoose from 'mongoose'
import model from '../src/model'

dotenv.config()

const database = process.env.DB_MONGO_DATABASE
const username = process.env.DB_MONGO_USERNAME
const password = process.env.DB_MONGO_PASSWORD
const hostname = process.env.DB_MONGO_HOSTNAME
const port = process.env.DB_MONGO_PORT

let datasource = null;

export default () => {
  if (!datasource) {

    const uri = `mongodb://${hostname}:${port}/${database}`;

    const options = {
      user: username,
      pass: password,
      useNewUrlParser: true,
    };

    const connection = mongoose.createConnection(uri, options);
    connection.Promise = global.Promise;

    const models = [];
    const modelNotifications = model(connection, mongoose);
    
    models[modelNotifications.modelName] = modelNotifications;

    datasource = {
      connection,
      mongoose,
      models,
    };
  }

  return datasource;
};
