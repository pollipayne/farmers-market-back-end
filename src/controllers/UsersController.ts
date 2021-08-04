import { Request, Response, Router } from 'express';
import { UserService } from '../services/UserService';
import { User } from '../entities/User';
import { Market } from '../entities/Market';



export class UsersController {
  public router: Router;
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }
  public index = async (req: Request, res: Response) => {
    const users = await this.userService.index();
    res.send(users).json();
  }

  public singleIndex = async (req: Request, res: Response) => {
    const id = req['params']['id']
    const user = await this.userService.singleIndex(Number(id));

    res.json(user)
  }

  public create = async (req: Request, res: Response) => {
    const user = req['body'] as User;
    const newUser = await this.userService.create(user);
    res.send(newUser);
  }
  // enpoint like.. http://localhost:3001/users/:id/markets
  public addMarketToUser = async (req: Request, res: Response) => {
    const market = req['body'] as Market;

  }


  public update = async (req: Request, res: Response) => {
    const user = req['body'] as User;
    const id = req['params']['id'];

    res.send(this.userService.update(user, Number(id)));
  }

  public delete = async (req: Request, res: Response) => {
    const id = req['params']['id'];

    res.send(this.userService.delete(Number(id)));
  }

  public routes() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.singleIndex)
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete)
  }
}



