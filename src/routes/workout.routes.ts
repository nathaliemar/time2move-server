import express from "express";
const router = express.Router();
import { prisma } from "../db/index";
import { Request, Response, NextFunction } from "express";

//GET All
router.get("/workouts", async (_, res: Response, next: NextFunction) => {
  try {
    const foundWorkouts = await prisma.workout.findMany();
    res.json(foundWorkouts);
  } catch (error) {
    next(error);
  }
});
//GET by id
router.get(
  "/workouts/:workoutId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { workoutId } = req.params;
    try {
      const foundWorkout = await prisma.workout.findUnique({
        where: { id: workoutId },
      });
      res.json(foundWorkout);
    } catch (error) {
      next(error);
    }
  }
);

//POST
router.post(
  "/workouts",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, duration } = req.body;
    const newWorkout = { name, description, duration };
    try {
      const createdWorkout = await prisma.workout.create({ data: newWorkout });
      res.status(201).json(createdWorkout);
    } catch (error) {
      next(error);
    }
  }
);

//PUT
router.put(
  "/workouts/:workoutId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { workoutId } = req.params;
    const { name, description, duration } = req.body;
    const newWorkoutDetails = { name, description, duration };
    try {
      const updatedWorkout = await prisma.workout.update({
        where: { id: workoutId },
        data: newWorkoutDetails,
      });
      res.json(updatedWorkout);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE
router.delete(
  "/workouts/:workoutId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { workoutId } = req.params;
    try {
      await prisma.workout.delete({ where: { id: workoutId } });
      res.json({ message: `Workout with id ${workoutId} was deleted` });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
