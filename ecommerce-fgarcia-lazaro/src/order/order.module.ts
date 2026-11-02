import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { OrdersRepository } from './order.repository';
import { typeOrmConfig } from 'src/config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/products.entity';
import { Orders } from 'src/order/entities/orders.entity';
import { Users } from 'src/users/entities/users.entity';
import { OrderDetails } from 'src/order/entities/orderdetails.entity';

@Module({imports: [TypeOrmModule.forFeature([Products, Orders, Users, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrderModule {}
