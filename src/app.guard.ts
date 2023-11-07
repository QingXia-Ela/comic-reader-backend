import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return false;
  }
}
