import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

export const Range = createParamDecorator(
  (data: [number, number], ctx: ExecutionContext) => {
    const [min, max] = data;
    const request = ctx.switchToHttp().getRequest();
    const { query } = request;
    const { count } = query;
    if (count < min || count > max) {
      throw new HttpException(`Invalid argument!`, 400);
    }
    return count;
  },
);
