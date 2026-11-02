import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categories } from '../../categories/entities/categories.entity';
import { OrderDetails } from '../../order/entities/orderdetails.entity';
import { Status } from '../../common/enums/status.enum';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name!: string;

  @Column({ type: 'text', nullable:false })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable:false })
  price!: number;

  @Column({ type: 'int', nullable:false })
  stock!: number;

  @Column({ type: 'text', default: 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw' })
  imgUrl!: string;

  @Column({ type: 'enum', enum: Status, default: Status.ENABLE })
  status!: Status;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: Categories;

  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails!: OrderDetails[];
}
