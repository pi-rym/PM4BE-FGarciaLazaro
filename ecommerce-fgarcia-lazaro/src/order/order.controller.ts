import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
// "import type" porque es solo un tipo y se usa en un parámetro con decorador (lo pide isolatedModules):
import type { AuthRequest } from 'src/auth/interfaces/auth-request.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderById(@Param('id', ParseUUIDPipe) id: string, @Req() request: AuthRequest) {
    return this.orderService.getOrderById(id, request.user);
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() newOrderData: CreateOrderDto, @Req() request: AuthRequest) {
    return this.orderService.addOrder(newOrderData, request.user);
  }

  @Put(':id/cancel')
  @UseGuards(AuthGuard)
  cancelOrder(@Param('id', ParseUUIDPipe) id: string, @Req() request: AuthRequest) {
    return this.orderService.cancelOrder(id, request.user);
  }
}
