import { Request } from "express";

export interface TypedRequest<T> extends Request {
  body: T;
}

export interface SendDetailsBody {
  lang: "en" | "he";
  email: string;
  title: string;
  adminId: string;
  groupId: string;
}

export type SendDetailsRequest = TypedRequest<SendDetailsBody>;
