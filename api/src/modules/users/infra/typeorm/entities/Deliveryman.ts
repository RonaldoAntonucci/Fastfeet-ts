import { Column, Entity } from 'typeorm';

import User from './User';

@Entity('users')
export default class Deliveryman extends User {
  @Column({ enum: ['deliveryman'] })
  role: 'deliveryman';
}
