import App from '@app';

export default class TestApp extends App {
  public async truncate(): Promise<void> {
    const conn = this.database.getConn();

    const clearPromises: Promise<void>[] = [];

    conn.forEach(connection =>
      connection.entityMetadatas.forEach(entity => {
        clearPromises.push(connection.getRepository(entity.name).clear());
      }),
    );

    await Promise.all(clearPromises);
  }
}
