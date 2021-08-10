import { Request, Response, Router } from 'express';
import { UserService } from '../services/UserService';
import { User } from '../entities/User';
import { Market } from '../entities/Market';
import { OAuth2Client } from 'google-auth-library';



export class UsersController {
  public router: Router;
  public userService: UserService;


  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  public auth = async (req: Request, res: Response) => {
    const client = new OAuth2Client(process.env.CLIENT_ID)

    const { token } = req['body']

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })

    const payload = ticket.getPayload();

    const user = await this.userService.singleAuth(payload?.email as string)
    if (!user) {
      let newUser = new User();
      newUser.userName = payload?.name,
        newUser.email = payload?.email,
        newUser.isLoggedIn = true
      newUser.password = token
      await this.userService.create(newUser)
    }
  }

  public index = async (req: Request, res: Response) => {
    const users = await this.userService.index();
    res.json(users);
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
    this.router.post('/api/v1/auth/google', this.auth)
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete)
  }
}



