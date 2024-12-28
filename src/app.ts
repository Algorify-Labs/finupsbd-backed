import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import cors from 'cors'
import notFound from './app/middleware/notFound';


const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true,
}))



app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Server is running' });
});

app.use(globalErrorHandler)    //todo global Error handler 
app.use(notFound)           //todo user request route not found handler
 

export default app;

