// types/express/index.d.ts
import { JwtPayload } from "./types/tsconfig.json"; // adjust the path if needed

declare global {
  namespace Express {
    interface Request {
      payload?: JwtPayload;
    }
  }
}
// Removed JSON configuration. Ensure this file only contains TypeScript declarations.