import express, {
  Express,
  Router,
  ErrorRequestHandler,
  Handler,
} from 'express';

interface IHttpServerOpts {
  routes?: Router | [Router];
  handlers?: ErrorRequestHandler | ErrorRequestHandler[];
  middlewares?: Handler | [Handler];
  jsonApi?: boolean;
}

interface IStartOptions {
  port: number;
}

export default class HttpServer {
  private server: Express;

  constructor(
    { routes, middlewares, handlers, jsonApi = true }: IHttpServerOpts = {
      jsonApi: true,
    },
  ) {
    this.server = express();

    if (jsonApi) {
      this.server.use(express.json());
    }

    if (middlewares) {
      this.server.use(middlewares);
    }

    if (routes) {
      this.server.use(routes);
    }

    if (handlers) {
      this.server.use(handlers);
    }
  }

  public start({ port }: IStartOptions): Express {
    this.server.listen(port);

    return this.server;
  }

  public getServer(): Express {
    return this.server;
  }
}
