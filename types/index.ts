import { Request } from "express";

export interface TypedRequest<T> extends Request {
  user?: {
    id: number;
    iat: number;
  };
  body: T;
}
