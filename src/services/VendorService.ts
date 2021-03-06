import { getConnection } from 'typeorm';
import { Vendor } from '../entities/Vendor';
import { MarketRepository } from '../repository/MarketRepository';
import { VendorRepository } from '../repository/VendorRepository';



export class VendorService {
  private vendorRepository: VendorRepository;
  private marketRepository: MarketRepository


  constructor() {
    this.vendorRepository = getConnection('user').getCustomRepository(VendorRepository)
    this.marketRepository = getConnection('user').getCustomRepository(MarketRepository)
  }


  public index = async () => {
    const vendors = await this.vendorRepository.find({
      relations: ['markets', 'products']
    })
    return vendors;
  }


  public singleIndex = async (id: number) => {
    const vendor = await this.vendorRepository.findOne(id, { relations: ['markets', 'products'] })
    return vendor;
  }


  public create = async (vendors: Vendor, marketId: number) => {
    const newVendor = vendors
    const associatedMarket = await this.marketRepository.findOne(marketId)
    if (associatedMarket && newVendor.markets) {
      newVendor.markets?.push(associatedMarket)
    } else if (associatedMarket) {
      newVendor.markets = []
      newVendor.markets.push(associatedMarket)
    } else {
      throw new Error("Couldn't find associated market")
    }
    await this.vendorRepository.save(vendors);
    return newVendor;
  }


  public update = async (vendor: Vendor, id: number) => {
    const updatedMarket = await this.vendorRepository.update(id, vendor);
    return `Vendor ${vendor.vendorName} has been updated.`;
  }


  public delete = async (id: number) => {
    const deletedVendor = await this.vendorRepository.findOne(id)
    if (deletedVendor) {
      const activeDelete = await this.vendorRepository.remove(deletedVendor)
    }
    return deletedVendor;
  }


};
