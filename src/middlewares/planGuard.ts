import { Request, Response, NextFunction } from "express";

export function planGuard(_req: Request, _res: Response, next: NextFunction) {
  // TODO: free/pro/premium kontrolü eklenecek.
  return next();
}
