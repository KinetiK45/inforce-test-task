import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { CreateCommentDto } from './dto/create.comment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products')
  async getProducts(
    @Query('orderBy') orderBy: string = 'name',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return await this.appService.getProducts(orderBy, order);
  }

  @Get('products/:product_id')
  async getProduct(
    @Param('product_id') product_id: number,
  ): Promise<ProductDto> {
    return await this.appService.getProductById(product_id);
  }

  @Post('products')
  async createProduct(@Body() fields: ProductDto) {
    return await this.appService.createProduct(fields);
  }

  @Patch('products/:product_id')
  async updateProduct(
    @Param('product_id') product_id: number,
    @Body() fields: UpdateProductDto,
  ): Promise<ProductDto> {
    return await this.appService.updateProduct(product_id, fields);
  }

  @Delete('products/:product_id')
  async deleteProduct(@Param('product_id') product_id: number) {
    return await this.appService.deleteProduct(product_id);
  }

  @Post('products/:product_id/comments')
  async createComment(
    @Param('product_id') product_id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.appService.createComment(product_id, createCommentDto);
  }
}
