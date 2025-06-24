import express from "express";
const router = express.Router();
import { prisma } from "../db/index";
import { Request, Response, NextFunction } from "express";

//GET ALL
router.get(
  "/sessions",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allSessions = await prisma.session.findMany({
        include: { workout: true },
      });
      res.json(allSessions);
    } catch (error) {
      next(error);
    }
  }
);

//GET UPCOMING
router.get(
  "/sessions/upcoming",
  async (req: Request, res: Response, next: NextFunction) => {
    const days = parseInt(req.query.days as string, 10) || 30;
    const now = new Date();
    const future = new Date();
    future.setDate(now.getDate() + days);

    try {
      const upcomingSessions = await prisma.session.findMany({
        where: {
          date: {
            gte: now,
            lte: future,
          },
        },
        include: { workout: true },
        orderBy: { date: "asc" },
      });
      res.json(upcomingSessions);
    } catch (error) {
      next(error);
    }
  }
);

//GET BY ID
router.get(
  "/sessions/:sessionId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.params;
    try {
      const foundSession = await prisma.session.findUnique({
        where: { id: sessionId },
      });
      res.json(foundSession);
    } catch (error) {
      next(error);
    }
  }
);

//POST
router.post(
  "/sessions",
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, notes, workoutId } = req.body;
    const newSession = { date, notes, workoutId };
    try {
      const createdSession = await prisma.session.create({ data: newSession });
      res.status(201).json(createdSession);
    } catch (error) {
      next(error);
    }
  }
);
//PUT
router.put(
  "/sessions/:sessionId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.params;
    const { date, notes, workoutId } = req.body;
    const newSessionDetails = { date, notes, workoutId };
    try {
      const updatedSession = await prisma.session.update({
        where: { id: sessionId },
        data: newSessionDetails,
      });
      res.json(updatedSession);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE

router.delete("/sessions/:sessionId", async (req, res, next) => {
  const { sessionId } = req.params;
  try {
    await prisma.session.delete({ where: { id: sessionId } });
    res.json({ message: `Session with id ${sessionId} deleted successfully` });
  } catch (error) {
    next(error);
  }
});

export default router;
