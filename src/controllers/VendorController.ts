import { Request, Response, Router } from 'express';
import { VendorService } from '../services/VendorService';
import { Vendor } from '../entities/Vendor';



export class VendorController {
  public router: Router;
  public vendorService: VendorService;

  constructor() {
    this.vendorService = new VendorService();
    this.router = Router();
    this.routes();
  }
  public index = async (req: Request, res: Response) => {
    const vendors = await this.vendorService.index();
    res.send(vendors).json();
  }

  public create = async (req: Request, res: Response) => {
    const vendor = req['body'] as Vendor;
    const newVendor = await this.vendorService.create(vendor);
    res.send(newVendor);
  }
  public update = async (req: Request, res: Response) => {
    const vendor = req['body'] as Vendor;
    const id = req['params']['id'];

    res.send(this.vendorService.update(vendor, Number(id)));
  }

  public delete = async (req: Request, res: Response) => {
    const id = req['params']['id'];

    res.send(this.vendorService.delete(Number(id)));
  }

  public routes() {
    this.router.get('/', this.index);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete)
  }
}


