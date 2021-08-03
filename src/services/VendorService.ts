import { getConnection, getRepository } from 'typeorm';
import { Vendor } from '../entities/Vendor';


import { VendorRepository } from '../repository/VendorRepository';

export class VendorService {
  private vendorRepository: VendorRepository;

  constructor() {
    this.vendorRepository = getConnection('user').getCustomRepository(VendorRepository)

  }

  public index = async () => {
    const vendors = await this.vendorRepository.find({
      relations: ['markets']
    })
    return vendors;
  }
  public create = async (vendors: Vendor) => {
    const newVendor = await this.vendorRepository.save(vendors);
    return newVendor;
  }
  public update = async (vendor: Vendor, id: number) => {
    const updatedMarket = await this.vendorRepository.update(id, vendor);
    return `Vendor ${vendor.vendorName} has been updated.`;
  }

  public delete = async (id: number) => {
    const deletedVendor = await this.vendorRepository.delete(id);
    return `vendor with ${id} ID has been deleted.`;
  }
};
