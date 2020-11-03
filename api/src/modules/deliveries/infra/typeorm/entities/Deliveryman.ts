import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class Deliveryman {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: ['deliveryman'] })
  role: 'deliveryman';
}
