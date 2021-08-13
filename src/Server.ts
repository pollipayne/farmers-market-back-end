
import express, { request, Request, Response } from 'express';
import { UsersController } from './controllers/UsersController';
import { createConnection } from 'typeorm';
import { MarketController } from './controllers/MarketController';
import cors from 'cors';
import { VendorController } from './controllers/VendorController';
import { ProductController } from './controllers/ProductController';



export class Server {
  private app: express.Application;
  private usersController?: UsersController;
  private marketsController?: MarketController;
  private vendorController?: VendorController
  private productController?: ProductController

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
      host: process.env.DB_HOSTNAME,
      port: 5432,
      ssl: true,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      url: "postgres://jvxpcknocllcav:afee2c468dd91bd95f572aec53d7c2548b4cf600ff3bc259459555e91217734f@ec2-3-237-55-151.compute-1.amazonaws.com:5432/ddcg7pfn0dlne0",
      entities: [
        'build/entities/*.js'
      ],
      synchronize: true,
      logging: false
    }).then((connection) => {
      console.log(connection.options)

    }).catch((error) => {
      console.log(error)
    }
    );

    this.usersController = new UsersController();
    this.marketsController = new MarketController();
    this.vendorController = new VendorController();
    this.productController = new ProductController();
    this.app.get('/', (req: Request, res: Response) => {
      res.send("LOOK AT ME I'M A HOME PAGE ENDPOINT!!!!!")
    })
    this.app.use(`/users/`, this.usersController.router);
    this.app.use(`/markets/`, this.marketsController.router)
    this.app.use(`/vendors/`, this.vendorController.router)
    this.app.use(`/products/`, this.productController.router)

  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening at port ${this.app.get('port')}.`)
    })
  }
}

const server = new Server();
server.start();



