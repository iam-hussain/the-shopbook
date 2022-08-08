import mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import { Log } from '@the-shopbook/helper';

const options: { [key: string]: boolean } = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoCreate: true,
  autoIndex: true,
};

export function connectDatabase(uri: string) {
  Log.debug(`MONGO_DB :: Connecting to mongo server at: ${uri}`);
  return new Promise<string>((resolve) => {
    mongoose.Promise = bluebird;
    mongoose.connect(uri, options, (error) => {
      if (error) {
        Log.error('MONGO_DB :: Failed to connect to the Mongo server!!', error);
        process.exit(1);
      } else {
        Log.info('MONGO_DB :: Connected to mongo server');
        resolve(uri);
      }
    });
  });
}

export default mongoose;
