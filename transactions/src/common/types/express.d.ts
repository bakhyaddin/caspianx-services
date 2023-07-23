import { TUser } from './jwt-payload';

declare global {
  namespace Express {
    export interface Request {
      user: TUser;
    }
  }
}
