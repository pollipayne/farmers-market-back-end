import { Request, Response, Router } from 'express';
import { MarketService } from '../services/MarketService';
import { Market } from '../entities/Market';



export class MarketController {
  public router: Router;
  public marketService: MarketService;


  constructor() {
    this.marketService = new MarketService();
    this.router = Router();
    this.routes();
  }


  public index = async (req: Request, res: Response) => {
    const markets = await this.marketService.index();
    res.json(markets);
  }


  public singleIndex = async (req: Request, res: Response) => {
    const id = req['params']['id']
    const market = await this.marketService.singleIndex(Number(id));
    res.json(market)
  }


  public create = async (req: Request, res: Response) => {
    const market = req['body']['newMarket'] as Market;
    const userID = req['body']['userId']
    const newMarket = await this.marketService.create(market, userID);
    res.send(newMarket);
  }


  public update = async (req: Request, res: Response) => {
    const market = req['body'] as Market;
    const id = req['params']['id'];
    res.send(this.marketService.update(market, Number(id)));
  }


  public delete = async (req: Request, res: Response) => {
    const id = req['params']['id'];
    res.send(this.marketService.delete(Number(id)));
  }

  public routes() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.singleIndex)
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete)
  }


};



