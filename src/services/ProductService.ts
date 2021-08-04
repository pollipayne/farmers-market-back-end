import { getConnection, getRepository } from 'typeorm';
import { Product } from '../entities/Product';


import { ProductRepository } from '../repository/ProductRepository';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = getConnection('user').getCustomRepository(ProductRepository)

  }

  public index = async () => {
    const products = await this.productRepository.find({
      relations: ['vendors']
    })
    return products;
  }
  public create = async (products: Product) => {
    const newProduct = await this.productRepository.save(products);
    return newProduct;
  }
  public update = async (product: Product, id: number) => {
    const updatedMarket = await this.productRepository.update(id, product);
    return `Product ${product.productName} has been updated.`;
  }

  public delete = async (id: number) => {
    const deletedProduct = await this.productRepository.delete(id);
    return `product with ${id} ID has been deleted.`;
  }
};
