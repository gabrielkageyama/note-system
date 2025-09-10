import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ObjectId } from 'mongoose';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
