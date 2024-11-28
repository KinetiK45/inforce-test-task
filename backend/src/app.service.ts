import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Commend } from './entity/commend.entity';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Commend)
    private commentRepository: Repository<Commend>,
  ) {}

  async getProductById(product_id: number): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: { id: product_id },
      relations: ['comments'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }
    return plainToClass(ProductDto, product);
  }

  async createProduct(productDto: ProductDto): Promise<ProductDto> {
    const product = new Product(
      productDto.imageUrl,
      productDto.name,
      productDto.count,
      productDto.size.width,
      productDto.size.height,
      productDto.weight,
    );
    await this.productRepository.save(product);
    return plainToClass(ProductDto, product);
  }

  async deleteProduct(product_id: number) {
    const product = await this.productRepository.findOne({
      where: { id: product_id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }
    await this.productRepository.remove(product);
    return { message: `Product with ID ${product_id} deleted successfully` };
  }

  async createComment(product_id: number, createCommentDto: CreateCommentDto) {
    const { description } = createCommentDto;
    const product = await this.productRepository.findOne({
      where: { id: product_id },
      relations: ['comments'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }
    const comment = new Commend(description);
    product.addComment(comment);
    await this.productRepository.save(product);
    return plainToClass(ProductDto, product);
  }

  async updateProduct(
    product_id: number,
    fields: UpdateProductDto,
  ): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: { id: product_id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }
    Object.assign(product, fields);
    await this.productRepository.save(product);
    return plainToClass(ProductDto, product);
  }

  async getProducts(
    orderBy: string,
    order: 'asc' | 'desc',
  ): Promise<ProductDto[]> {
    const validFields = ['name', 'count'];
    if (!validFields.includes(orderBy)) orderBy = 'name';

    const products = await this.productRepository.find({
      order: {
        [orderBy]: order.toUpperCase(),
      },
    });
    return plainToClass(ProductDto, products);
  }
}
