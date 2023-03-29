import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) { };

  create(createProductDto: CreateProductDto) {
    const { title, image } = createProductDto;
    return this.productRepository.save({ title, image });
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({ id }, updateProductDto);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(+id);
  }
}
