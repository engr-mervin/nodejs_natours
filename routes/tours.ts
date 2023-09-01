import express from 'express';
import {
  getTour,
  updateTour,
  deleteTour,
  getAllTours,
  createTour,
} from '../controllers/tourController.js';

const tourRouter = express.Router();
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
tourRouter.route('/').get(getAllTours).post(createTour);

export default tourRouter;
