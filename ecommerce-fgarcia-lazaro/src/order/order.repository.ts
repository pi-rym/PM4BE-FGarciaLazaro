import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { OrderDetails } from 'src/order/entities/orderdetails.entity';
import { Orders } from 'src/order/entities/orders.entity';
import { Products } from 'src/products/entities/products.entity';
import { Users } from 'src/users/entities/users.entity';
import { Status } from 'src/common/enums/status.enum';
import { In, MoreThan, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ormOrdersRepository: Repository<Orders>,
    @InjectRepository(Users)
    private ormUsersRepository: Repository<Users>,
    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>,
  ) {}

  async getOrderById(id: string): Promise<Orders> {
    const order = await this.ormOrdersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }

    return order;
  }

  async addOrder(newOrderData: CreateOrderDto): Promise<Orders[]> {
    // 1. Desestructuramos la información recibida:
    const { userId, products } = newOrderData;

    // 2. Cada producto debe tener un id válido y no se pueden repetir:
    const productIds = products.map((element) => element.id as string);
    if (!productIds.every((id) => isUUID(id))) {
      throw new BadRequestException('Cada producto debe tener un id con formato UUID');
    }
    if (new Set(productIds).size !== productIds.length) {
      throw new BadRequestException('La orden no puede repetir productos');
    }

    // 3. Verificamos que exista el Usuario:
    const user = await this.ormUsersRepository.findOneBy({ id: userId, status: Status.ENABLE });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    // 4. Verificamos que existan los Productos y que tengan stock:
    const foundProducts = await this.ormProductsRepository.findBy({ id: In(productIds), status: Status.ENABLE });
    if (foundProducts.length !== productIds.length) {
      const missingId = productIds.find(
        (id) => !foundProducts.some((product) => product.id === id),
      );
      throw new NotFoundException(`Producto con id ${missingId} no encontrado`);
    }
    const withoutStock = foundProducts.find((product) => product.stock <= 0);
    if (withoutStock) {
      throw new ConflictException(`Producto con id ${withoutStock.id} sin stock`);
    }

    // 5. Grabamos todo en una transacción: si algo falla, no queda nada a medias:
    const newOrderId = await this.ormOrdersRepository.manager.transaction(
      async (manager) => {
        // 6. Descontamos el stock de todos; si a alguno ya no le queda, se deshace todo:
        const { affected } = await manager.update(
          Products,
          { id: In(productIds), stock: MoreThan(0), status: Status.ENABLE },
          { stock: () => 'stock - 1' },
        );
        if (affected !== productIds.length) {
          throw new ConflictException('Uno de los productos se quedó sin stock');
        }

        // 7. Creamos la Orden:
        const order = new Orders();
        order.date = new Date();
        order.user = user;
        const newOrder = await manager.save(order);

        // 8. Creamos "OrderDetail" con el total y todos los productos:
        const total = foundProducts.reduce(
          (sum, product) => sum + Number(product.price),
          0,
        );
        const orderDetail = new OrderDetails();
        orderDetail.price = Number(total.toFixed(2));
        orderDetail.products = foundProducts;
        orderDetail.order = newOrder;
        await manager.save(orderDetail);

        return newOrder.id;
      },
    );

    // 9. Enviamos al cliente la compra con la info de productos:
    return await this.ormOrdersRepository.find({
      where: { id: newOrderId },
      relations: {
        orderDetails: {
          products: {
            category: true,
          },
        },
      },
    });
  }
}
