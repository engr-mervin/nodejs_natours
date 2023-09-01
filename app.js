import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tours.js';
import userRouter from './routes/users.js';
import { STATIC_FOLDER } from './paths.js';
const app = express();
//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(STATIC_FOLDER));
app.use((req, res, next) => {
    console.log('Hello from the middleware 👌');
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
//ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
export default app;
