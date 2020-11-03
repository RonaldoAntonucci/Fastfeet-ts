import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import DeliveryModel from '@modules/deliveries/models/DeliveryModel';

@Entity('deliveries')
export default class Delivery extends DeliveryModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'deliveryman_id' })
  deliverymanId: string;

  @Column()
  product: string;

  @Column()
  adress: string;

  @Column()
  postalCode: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: 'date', name: 'start_date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date', nullable: true })
  endDate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  canceledAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
