import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://glfbncoo:OVhb5QEf74Ba8v7qvr0-RGkPthb89uyl@stingray.rmq.cloudamqp.com/glfbncoo'],
          queue: 'main_products_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule]
})
export class ProductsModule { }
