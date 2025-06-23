import { Request, Response, NextFunction } from "express";

//By default, Error does not have "status"
interface CustomError extends Error {
  status?: number;
}

function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
}

function notFoundHandler(_req: Request, _res: Response, next: NextFunction) {
  const err: CustomError = new Error("Not Found");
  err.status = 404;
  next(err);
}

export { errorHandler, notFoundHandler };
