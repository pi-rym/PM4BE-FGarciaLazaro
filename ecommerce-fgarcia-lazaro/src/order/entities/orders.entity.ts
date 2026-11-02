import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetails } from './orderdetails.entity';
import { Users } from '../../users/entities/users.entity';
import { OrderStatus } from '../../common/enums/order-status.enum';

@Entity({ name: 'orders' })
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'date' })
  date!: Date;

  // Cancelar una orden no la borra: cambia su estado y devuelve el stock:
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.ACTIVE })
  status!: OrderStatus;

  @ManyToOne(() => Users, (user) => user.orders_id)
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetails!: OrderDetails;
}
