import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import settingsCustom from 'settings.custom';

const AUTH_HEADER_KEY = settingsCustom.auth.header_key || 'auth_key';
const AUTH_HEADER_VALUE = settingsCustom.auth.header_value || '114514';

const IP_THROTTLE_MAP = new Map<string, number>();
const MAX_REQUEST_PER_SECOND = 20;

@Injectable()
export class GuardMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (
      !settingsCustom.auth.active ||
      req.headers[AUTH_HEADER_KEY] === AUTH_HEADER_VALUE
    ) {
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
