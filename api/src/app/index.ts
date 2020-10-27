import './bootstrap';
import { Router, Express } from 'express';

import Server from '@shared/infra/http/server';
import Database from '@shared/infra/typeorm';

interface iStartOpts {
  routes?: Router | [Router];
}

export default class App {
  private server: Server;

  protected database: Database;

  public async start(startOpts: iStartOpts): Promise<void> {
    this.database = new Database();

    await this.database.start();

    this.server = new Server({
      routes: startOpts.routes,
      jsonApi: true,
    });
  }

  public async stop(): Promise<void> {
    await this.database.stop();
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
