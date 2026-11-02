import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from '../../products/entities/products.entity';

@Entity({ name: 'order_details' })
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order!: Orders;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
  name: 'orderdetails_products',
  joinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
  inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
})
  products!: Products[];
}
