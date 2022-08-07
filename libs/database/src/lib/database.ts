import mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import { Log } from '@the-shopbook/helper';

const MONGO_DB_URL: string = process.env['MONGO_DB_URL'] || '';

export const connectDatabase = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if(!MONGO_DB_URL) {
      reject()
    }
    const options: { [key: string]: boolean } = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose.Promise = bluebird;

    Log.debug(`MONGO_DB :: Connecting to mongo server at: ${MONGO_DB_URL}`);
    mongoose.connect(MONGO_DB_URL, options, (error) => {
      // handle the error case
      if (error) {
        Log.error('MONGO_DB :: Failed to connect to the Mongo server!!', error);
        reject();
      } else {
        Log.info('MONGO_DB :: Connected to mongo server');
        resolve();
      }
    });
  });

export default mongoose;
