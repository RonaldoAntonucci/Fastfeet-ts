import './bootstrap';
import { Router, Express } from 'express';
import { errors } from 'celebrate';

import Server from '@shared/infra/http/server';
import Database from '@shared/infra/typeorm';
import ErrorHandler from '@shared/errors/Handler';

export interface iStartOpts {
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
      handlers: [errors(), ErrorHandler],
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
