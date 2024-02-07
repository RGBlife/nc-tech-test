import { Request, Response, NextFunction } from "express";

export enum ErrorType {
  NotFound = 404,
  BadRequest = 400,
}

export class EndpointError extends Error {
  status: number;

  constructor(message: string, status: ErrorType) {
    super(message);
    this.status = status;
  }
}

export const handleCustomErrors = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof EndpointError) {
    return res.status(err.status).send({ error: err.message });
  } else {
    next(err);
  }
};

export const handleServerErrors = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(500).send({ message: "Internal Server Error" });
};
