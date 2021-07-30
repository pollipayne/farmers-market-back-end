import { Server } from './Server';
import 'reflect-metadata';
import { createConnection, getConnection, getConnectionManager } from 'typeorm';
import { User } from './entities/User';




// export async function initializeDB(): Promise<void> {
//   await
//     createConnection({
//       name: 'user',
//       type: "postgres",
//       host: "localhost",
//       port: 5432,
//       username: "postgres",
//       password: "postgres",
//       database: "market",
//       entities: [
//         'build/entities/*.js'
//       ],
//       synchronize: true,
//       logging: false
//     }).then((connection) => {
//       console.log(connection.options)
//       // here you can start to work with your entities
//     }).catch((error) => {
//       console.log(error)
//     }
//     )
// };

// // const connection = getConnectionManager().get('user');
// const connection = getConnection('user');

// console.log(connection.options)


// const server = new Server();

// server.start();