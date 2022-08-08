import { Cluster } from 'cluster';
import { Log } from '@the-shopbook/helper';
import { Express, ErrorRequestHandler, Request, Response } from 'express';
import { errorRespond } from './responder';

export function clusterEventsHandler(_cluster: Cluster) {
  // Catch cluster listening event...
  _cluster.on('listening', (worker) =>
    Log.info(
      `CLUSTER :: Cluster with ProcessID '${worker.process.pid}' Connected!`
    )
  );

  // Catch cluster once it is back online event...
  _cluster.on('online', (worker) =>
    Log.info(
      `CLUSTER :: Cluster with ProcessID '${worker.process.pid}' has responded after it was forked! `
    )
  );

  // Catch cluster disconnect event...
  _cluster.on('disconnect', (worker) =>
    Log.info(
      `CLUSTER :: Cluster with ProcessID '${worker.process.pid}' Disconnected!`
    )
  );

  // Catch cluster exit event...
  _cluster.on('exit', (worker, code, signal) => {
    Log.info(
      `CLUSTER :: Cluster with ProcessID '${worker.process.pid}' is Dead with Code '${code}, and signal: '${signal}'`
    );
    // Ensuring a new cluster will start if an old one dies
    _cluster.fork();
  });
}

export function processEventsHandler() {
  // Catch the Process's uncaught-exception
  process.on('uncaughtException', (exception) => Log.error(exception));

  // Catch the Process's warning event
  process.on('warning', (warning) => Log.warn(warning));
}

export function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response
) {
  Log.error(err);
  return errorRespond(res, 'unexpected_server_error', 500);
}

export function notFoundHandler(_express: Express) {
  _express.all('*', (req: Request, res: Response) => {
    // ip from client header or from express request object
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
    return errorRespond(res, 'url_not_found', 404);
  });
  return _express;
}
