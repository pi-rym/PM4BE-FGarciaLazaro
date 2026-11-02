import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from '../../order/entities/orders.entity';
import { Status } from '../../common/enums/status.enum';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  password!: string;

  @Column({
    type: 'bigint',
    nullable: false,
    
    transformer: { to: (value: number) => value, from: (value: string) => Number(value) },
  })
  phone!: number;

  @Column({ type: 'varchar', length: 50})
  country!: string ;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'varchar', length: 50})
  city!: string;

  @Column({ type: 'boolean', default: false })
  isAdmin!: boolean;

  @Column({ type: 'enum', enum: Status, default: Status.ENABLE })
  status!: Status;

  @OneToMany(() => Orders, (order) => order.user)
  orders_id!: Orders[];
}
