interface UserSchema {
  id?: number;
  user_id: number;
  admin: boolean;
}

interface ReplySchema {
  success: (data?: Object) => void;
  error: (errorCode: number, code?: number, message?: object) => void;
  server: (e: Error) => void;
}

declare namespace Express {
  interface Response {
    reply: ReplySchema;
  }
  interface Request {
    user?: UserSchema;
  }
}
