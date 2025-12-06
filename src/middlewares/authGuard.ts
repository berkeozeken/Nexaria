import { Request, Response, NextFunction } from "express";

export function authGuard(_req: Request, _res: Response, next: NextFunction) {
  // TODO: JWT kontrolü eklenecek.
  return next();
}
