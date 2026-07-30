import { Injectable, NotFoundException } from '@nestjs/common';

interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
}

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    { id: '1', name: 'Sample Widget', price: 19.99, sku: 'SW-001' },
    { id: '2', name: 'DevOps Kit', price: 49.5, sku: 'DK-002' },
  ];

  findAll() {
    return { items: this.products, count: this.products.length };
  }

  findOne(id: string) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(product: Omit<Product, 'id'>) {
    const newProduct: Product = {
      id: `${this.products.length + 1}`,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, changes: Partial<Omit<Product, 'id'>>) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    Object.assign(product, changes);
    return product;
  }

  remove(id: string) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const [removed] = this.products.splice(index, 1);
    return { deleted: true, product: removed };
  }
}
