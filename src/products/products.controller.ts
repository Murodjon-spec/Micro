import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) { }

  @Post(':id/like')
  async likeBoss(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (!product) {
      throw new BadRequestException('Product not found');
    };
    return this.productsService.update(+id, { likes: product.likes + 1 });
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    this.client.emit('product_created', product);
    return product;
  }

  @Get()
  async findAll() {
    this.client.emit('hello', 'Hello from another server');
    const products = await this.productsService.findAll();
    return products;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.productsService.update(+id, updateProductDto);
    const product = await this.productsService.findOne(+id);
    this.client.emit('product_updated', product);
    return product;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
    this.client.emit('product_deleted', id);
    return id;
  }
}
