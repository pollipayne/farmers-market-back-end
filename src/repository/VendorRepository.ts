import { EntityRepository, Repository } from 'typeorm';
import { Vendor } from '../entities/Vendor';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> {

}

