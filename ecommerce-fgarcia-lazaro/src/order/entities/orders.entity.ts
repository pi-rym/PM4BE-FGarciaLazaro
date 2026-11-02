import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetails } from './orderdetails.entity';
import { Users } from '../../users/entities/users.entity';

@Entity({ name: 'orders' })
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'date' })
  date!: Date;

  @ManyToOne(() => Users, (user) => user.orders_id)
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetails!: OrderDetails;
}
