
import express, { Request, Response } from 'express';
import { UsersController } from './controllers/UsersController';
import { createConnection } from 'typeorm';



export class Server {
  private app: express.Application;
  private usersController: UsersController;

  constructor() {
    this.app = express();
    this.configuration();
    // this.usersController = new UsersController();
    this.routes();
  }

  public configuration() {
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(express.json())
  }

  public async routes() {
    // await initializeDB();
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
    this.app.get('/', (req: Request, res: Response) => {
      res.send("helloooooooooo")
    })
    this.app.use(`/users/`, this.usersController.router); // configure routes of the users controller

  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening at port ${this.app.get('port')}.`)
    })
  }
}

const server = new Server();
server.start();



