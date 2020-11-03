import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import DeliverymanModel from '@modules/deliveries/models/DeliverymanModel';

import Delivery from './Delivery';

@Entity('users')
export default class Deliveryman extends DeliverymanModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: ['deliveryman'] })
  role: 'deliveryman';

  @OneToMany(() => Delivery, delivery => delivery.deliveryman)
  deliveries: Delivery[];
}
