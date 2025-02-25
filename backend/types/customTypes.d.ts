import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
      userData?: {
        id: string;
        email: string;
      };
    }
  }
}
