import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get(':id')
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  addOrder(@Body() newOrderData: CreateOrderDto) {
    return this.orderService.addOrder(newOrderData);
  }
}