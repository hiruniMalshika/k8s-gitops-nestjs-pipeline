import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): { items: Array<{ id: string; name: string; price: number; sku: string }> ; count: number } {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): { id: string; name: string; price: number; sku: string } {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() body: { name: string; price: number; sku: string }): { id: string; name: string; price: number; sku: string } {
    return this.productsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name?: string; price?: number; sku?: string }): { id: string; name: string; price: number; sku: string } {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean; product: { id: string; name: string; price: number; sku: string } } {
    return this.productsService.remove(id);
  }
}
