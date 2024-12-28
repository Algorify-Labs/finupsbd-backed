import { Server } from 'http';
import app from './app';
import { ConfigFile } from './config';

let server: Server;

async function main() {
  try {
    server = app.listen(ConfigFile.post, () => {
      console.log(`Server is running on port ${ConfigFile.post}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();


//todo: handel unhandled Rejection and  uncaught Exception error

process.on('uncaughtException', () => {
  console.log('Unhandled Promise Rejection if deleted, shutting down server');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});


process.on('uncaughtException', () => {
    console.log("Uncaught Exception if deleted, shutting down server ");
    process.exit(1)
  })