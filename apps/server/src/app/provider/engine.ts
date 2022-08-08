import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Server } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import typeDefs from '../graphql/schema/index';
import resolvers from '../graphql/resolvers/index';
import context from '../graphql/context';
import { Log, httpLoggerMiddleware } from '@the-shopbook/helper';
import { errorHandler, notFoundHandler } from '@the-shopbook/utility';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export async function startEngine(port: number) {
  Log.info('Express :: Initializes the express server');
  let app = express();

  Log.info('Middleware :: Booting the middleware...');
  // middleware that can be used to enable CORS
  app.use(cors());
  // Enables the request body parser
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use(httpLoggerMiddleware);

  Log.info('HTTP :: Creating HTTP server...');
  const httpServer = http.createServer(app);

  Log.info('WebSocketServer :: Creating web socket server...');
  const wsServer = new Server({
    port: 4000,
    path: '/graphql',
  });
  // Save the returned server's info so we can shut down this server later
  const serverCleanup = useServer({ schema }, wsServer);

  Log.info('Apollo :: Creating Apollo server...');
  const server = new ApolloServer({
    schema,
    context,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  Log.info('Apollo :: Staring Apollo server...');
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  Log.info('Exception :: Registering Exception/Error Handlers...');
  app.use(errorHandler);
  app = notFoundHandler(app);

  app.listen(port, () => {
    Log.info(
      `🚀 GraphQL ready at http://localhost:${port}${server.graphqlPath}`
    );
    return Log.info(`Listening :: Server is running @ ${port}`);
  });

  return app;
}
