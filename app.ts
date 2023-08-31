import { Request, Response } from 'express';
import express from 'express';
import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';
import { TOURS_SIMPLE } from './utils/path.js';
import { JSEND, Tour } from './utils/types.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
const tours: Tour[] = JSON.parse(
  fs.readFileSync(__dirname + path.sep + TOURS_SIMPLE, 'utf-8')
);

console.log(__dirname + path.sep + TOURS_SIMPLE);

app.get('/api/v1/tours/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);

  tour
    ? res.status(200).json({ status: 'success', data: tour })
    : res.status(404).json({ status: 'fail', message: 'Invalid ID' });
});

app.get('/api/v1/tours', (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

app.post('/api/v1/tours', (req: Request, res: Response) => {
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
});

app.patch('/api/v1/tours/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  tour
    ? res.status(200).json({ status: 'success', data: '<Updated tour.../>' })
    : res.status(404).json({ status: 'fail' });
});

const port = 3000;
~app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
