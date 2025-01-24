import { TMiddlewareUser } from "./commonTypes";

declare global {
  namespace Express {
    interface Request {
      user?: TMiddlewareUser;
    }
  }
}