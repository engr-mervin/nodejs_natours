import { Request, Response } from 'express';
import { __rootdirname, tours } from '../initialize.js';
import { Tour } from '../utils/types.js';
import path from 'node:path';
import fs from 'node:fs';
import { TOURS_SIMPLE } from '../utils/path.js';
import { JSEND } from '../utils/types.js';

export const getTour = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);

  tour
    ? res.status(200).json({ status: 'success', data: tour })
    : res.status(404).json({ status: 'fail', message: 'Invalid ID' });
};

export const getAllTours = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

export const createTour = (req: Request, res: Response) => {
  const newId: number = tours.length;
  const newTour: Tour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    __rootdirname + path.sep + TOURS_SIMPLE,
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

export const updateTour = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  let tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail' });
  }
  tour = { ...tour, ...req.body };
  res.status(200).json({ status: 'success', data: tour });
};

export const deleteTour = (req: Request, res: Response) => {
  res.status(204).json({ status: 'success', data: null });
};
