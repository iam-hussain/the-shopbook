import { connectDatabase } from '@the-shopbook/database';
import { Log } from '@the-shopbook/helper';
import { startEngine } from './app/provider/engine';

const MONGO_DB_URL: string = process.env['MONGO_DB_URL'] || '';
const PORT = Number(process.env['PORT'] || '5000');

(async function startServer() {
  if (!MONGO_DB_URL) {
    Log.error('MAIN FILE :: MONGO_DB :: Invalid MongoDB URI!!', {
      MONGO_DB_URL,
    });
    process.exit(1);
  }
  connectDatabase(MONGO_DB_URL);
  startEngine(PORT);
})();
