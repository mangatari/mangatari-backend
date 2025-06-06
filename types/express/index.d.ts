import type { JwtPayload } from "../auth";

declare global {
  namespace Express {
    interface Request {
      payload?: JwtPayload;
    }
  }
}

export {};