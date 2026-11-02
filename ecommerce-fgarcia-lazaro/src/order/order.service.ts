import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getOrderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }

  addOrder(newOrderData: CreateOrderDto) {
    return this.ordersRepository.addOrder(newOrderData);
  }
}