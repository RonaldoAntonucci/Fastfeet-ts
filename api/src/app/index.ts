import { Router, Express } from 'express';

import Server from '@shared/infra/http/server';

interface iStartOpts {
  routes?: Router | [Router];
}

export default class App {
  private server: Server;

  public async start(startOpts: iStartOpts): Promise<void> {
    this.server = new Server({
      routes: startOpts.routes,
      jsonApi: true,
    });
  }

  public listen(port: number): void {
    this.server.start({ port });

    // eslint-disable-next-line no-console
    console.log(`Server started on port ${port}!`);
  }

  public http(): Express {
    return this.server.getServer();
  }
}
