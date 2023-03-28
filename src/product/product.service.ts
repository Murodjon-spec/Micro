import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto): Promise<Product>{
    const {title,image} = createProductDto;

    return this.productRepository.save({title,image});
  }

  findAll(): Promise<Product[]>{
    return this.productRepository.find();
  }
  findOne(id: number): Promise<Product>{
    return this.productRepository.findOneBy({id});
  }

  update(id: number , UpdateProductDto: UpdateProductDto) {
    return this.productRepository.update({id}, UpdateProductDto);
  }
  remove(id: number) {
    return this.productRepository.delete({id});
  }
}