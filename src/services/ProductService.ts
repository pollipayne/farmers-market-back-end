import { getConnection, getRepository } from 'typeorm';
import { Product } from '../entities/Product';

import { VendorRepository } from '../repository/VendorRepository';
import { ProductRepository } from '../repository/ProductRepository';

export class ProductService {
  private productRepository: ProductRepository;
  private vendorRepository: VendorRepository

  constructor() {
    this.productRepository = getConnection('user').getCustomRepository(ProductRepository)
    this.vendorRepository = getConnection('user').getCustomRepository(VendorRepository)

  }

  public index = async () => {
    const products = await this.productRepository.find({
      relations: ['vendors']
    })
    return products;
  }

  public create = async (products: Product, vendorId: number) => {
    const newProduct = products
    const associatedVendor = await this.vendorRepository.findOne(vendorId)
    if (associatedVendor && newProduct.vendors) {
      newProduct.vendors.push(associatedVendor)

    } else if (associatedVendor) {
      newProduct.vendors = []
      newProduct.vendors.push(associatedVendor)
    } else {
      throw new Error("Couldn't find associated user")
    }
    await this.vendorRepository.save(products);
    return newProduct;
  }

  public update = async (product: Product, id: number) => {
    const updatedMarket = await this.productRepository.update(id, product);
    return `Product ${product.productName} has been updated.`;
  }

  public delete = async (id: number) => {
    const deletedProduct = await this.productRepository.findOne(id)
    if (deletedProduct) {
      const activeDelete = await this.productRepository.remove(deletedProduct)
    }
    return deletedProduct;
  }
};
