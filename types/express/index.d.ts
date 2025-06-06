import { JwtPayload } from "../../routes/auth.routes";

declare global {
  namespace Express {
    interface Request {
      payload?: JwtPayload;
    }
  }
}

export {};