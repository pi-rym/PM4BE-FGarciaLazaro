import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { CreateOrderDto } from './dto/order.dto';
import { AuthUser } from 'src/auth/interfaces/auth-request.interface';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getOrderById(id: string, requester: AuthUser) {
    return this.ordersRepository.getOrderById(id, requester);
  }

  addOrder(newOrderData: CreateOrderDto, requester: AuthUser) {
    return this.ordersRepository.addOrder(newOrderData, requester);
  }

  cancelOrder(id: string, requester: AuthUser) {
    return this.ordersRepository.cancelOrder(id, requester);
  }
}
