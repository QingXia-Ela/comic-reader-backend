import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

const AUTH_HEADER_KEY = '114514';
const AUTH_HEADER_KEYWORD = 'auth_key';

const IP_THROTTLE_MAP = new Map<string, number>();
const MAX_REQUEST_PER_SECOND = 20;

@Injectable()
export class GuardMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.headers[AUTH_HEADER_KEYWORD] === AUTH_HEADER_KEY) {
      next();
    } else {
      Logger.warn(
        `Unauthorized request: ${req.url} from ${req.ip}`,
        new Date().toISOString(),
      );
      res.sendStatus(500);
    }
  }
}
