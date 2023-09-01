import { __rootdirname, tours } from '../initialize.js';
import path from 'node:path';
import fs from 'node:fs';
import { TOURS_SIMPLE } from '../utils/path.js';
export const getTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find((el) => el.id === id);
    tour
        ? res.status(200).json({ status: 'success', data: tour })
        : res.status(404).json({ status: 'fail', message: 'Invalid ID' });
};
export const getAllTours = (req, res) => {
    return res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: { tours },
    });
};
export const createTour = (req, res) => {
    const newId = tours.length;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(__rootdirname + path.sep + TOURS_SIMPLE, JSON.stringify(tours), (err) => {
        if (err) {
            res.status(500).send('Something went wrong.');
        }
        else {
            const data = {
                status: 'success',
                data: {
                    tours: newTour,
                },
            };
            res.status(201).json(data);
        }
    });
};
export const updateTour = (req, res) => {
    const id = Number(req.params.id);
    let tour = tours.find((el) => el.id === id);
    if (!tour) {
        return res.status(404).json({ status: 'fail' });
    }
    tour = { ...tour, ...req.body };
    res.status(200).json({ status: 'success', data: tour });
};
export const deleteTour = (req, res) => {
    res.status(204).json({ status: 'success', data: null });
};
