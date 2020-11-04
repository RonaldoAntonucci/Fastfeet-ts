import App, { iStartOpts } from '@app';

export default class TestApp extends App {
  public async truncate(): Promise<void> {
    const conn = this.database.getConn();
    // const clearPromises: Promise<void>[] = [];
    // conn.forEach(connection =>
    //   connection.entityMetadatas.forEach(entity => {
    //     clearPromises.push(connection.getRepository(entity.name).clear());
    //   }),
    // );
    await Promise.all(conn.map(con => con.dropDatabase()));
    await Promise.all(conn.map(con => con.synchronize()));
  }

  public async start(opts: iStartOpts): Promise<void> {
    await super.start(opts);
    await Promise.all(
      this.database.getConn().map(conn => conn.runMigrations()),
    );
  }

  public async stop(): Promise<void> {
    await Promise.all(this.database.getConn().map(conn => conn.dropDatabase()));
    await super.stop();
  }
}
