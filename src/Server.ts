
import express, { request, Request, Response } from 'express';
import { UsersController } from './controllers/UsersController';
import { createConnection } from 'typeorm';
import { MarketController } from './controllers/MarketController';
import cors from 'cors';
import { VendorController } from './controllers/VendorController';



export class Server {
  private app: express.Application;
  private usersController?: UsersController;
  private marketsController?: MarketController;
  private vendorController?: VendorController

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
  }

  public configuration() {
    this.app.set('port', process.env.PORT || 3001)
    this.app.use(function (req: Request, res: Response, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    })
    this.app.use(cors())
    this.app.use(express.json())
  }

  public async routes() {
    await createConnection({
      name: 'user',
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "market",
      entities: [
        'build/entities/*.js'
      ],
      synchronize: true,
      logging: false
    }).then((connection) => {
      console.log(connection.options)

      // here you can start to work with your entities
    }).catch((error) => {
      console.log(error)
    }
    );

    this.usersController = new UsersController();
    this.marketsController = new MarketController();
    this.vendorController = new VendorController();
    this.app.get('/', (req: Request, res: Response) => {
      res.send("LOOK AT ME I'M A HOME PAGE ENDPOINT!!!!!")
    })
    this.app.use(`/users/`, this.usersController.router);
    this.app.use(`/markets/`, this.marketsController.router)
    this.app.use(`/vendors/`, this.vendorController.router) // configure routes of the users controller

  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening at port ${this.app.get('port')}.`)
    })
  }
}

const server = new Server();
server.start();



