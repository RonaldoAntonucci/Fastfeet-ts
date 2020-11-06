import { getRepository, ObjectLiteral } from 'typeorm';
import Chance from 'chance';

const faker = Chance();

export interface IFactory<T extends ObjectLiteral> {
  create(attrs?: Partial<T>): Promise<T>;

  createMany(quantity: number, attrs?: Partial<T>): Promise<T[]>;

  clearAll(): Promise<number>;

  faker: Chance.Chance;
}

type FakeFunction<K> = (...args: []) => ThisType<K>;

export default function Factory<T>(
  entityName: string,
  fakeFunction: FakeFunction<T>,
): IFactory<T> {
  const ormRepo = getRepository<T>(entityName);

  const createdEntities: T[] = [];

  const create = async (attrs: Partial<T> = {}): Promise<T> => {
    const newAttrs: T = { ...fakeFunction(), ...attrs } as T;

    const entity = ormRepo.create(newAttrs);

    await ormRepo.save(entity);

    return entity;
  };

  const createMany = async (
    quantity: number,
    attrs: Partial<T> = {},
  ): Promise<T[]> => {
    const entities: T[] = [];
    for (let i = quantity; i > 0; i -= 1) {
      const newAttrs: T = { ...fakeFunction(), ...attrs } as T;

      const fakeDeliveryman = ormRepo.create(newAttrs);

      entities.push(fakeDeliveryman);
    }

    await ormRepo.save(entities);

    createdEntities.push(...entities);

    return entities;
  };

  const clearAll = async (): Promise<number> => {
    const clearPromises = createdEntities.map(entities =>
      ormRepo.delete(entities),
    );

    const deleted = await Promise.all(clearPromises);

    return deleted.reduce((acc, current) => {
      if (current && current.affected) {
        return acc + current.affected;
      }
      return acc;
    }, 0);
  };

  return {
    create,
    createMany,
    clearAll,
    faker,
  };
}
