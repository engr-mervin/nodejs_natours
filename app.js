import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tours.js';
import userRouter from './routes/users.js';
const app = express();
//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
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
//SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
