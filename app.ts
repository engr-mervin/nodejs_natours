import { Request, Response, NextFunction } from 'express';
import express from 'express';
import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';
import { TOURS_SIMPLE } from './utils/path.js';
import { JSEND, Tour } from './utils/types.js';
import morgan from 'morgan';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

const tours: Tour[] = JSON.parse(
  fs.readFileSync(__dirname + path.sep + TOURS_SIMPLE, 'utf-8')
);

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Hello from the middleware 👌');
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTE HANDLERS
const getTour = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);

  tour
    ? res.status(200).json({ status: 'success', data: tour })
    : res.status(404).json({ status: 'fail', message: 'Invalid ID' });
};

const getAllTours = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const createTour = (req: Request, res: Response) => {
  const newId: number = tours.length;
  const newTour: Tour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    __dirname + path.sep + TOURS_SIMPLE,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).send('Something went wrong.');
      } else {
        const data: JSEND = {
          status: 'success',
          data: {
            tours: newTour,
          },
        };
        res.status(201).json(data);
      }
    }
  );
};

const updateTour = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  let tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail' });
  }
  tour = { ...tour, ...req.body };
  res.status(200).json({ status: 'success', data: tour });
};

const deleteTour = (req: Request, res: Response) => {
  res.status(204).json({ status: 'success', data: null });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not yet defined!' });
};
const createUser = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not yet defined!' });
};
const getUser = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not yet defined!' });
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not yet defined!' });
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not yet defined!' });
};
//ROUTES
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
