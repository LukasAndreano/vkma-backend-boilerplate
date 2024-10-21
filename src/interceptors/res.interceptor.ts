import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  statusCode: number;
  data: T;
}

@Injectable()
export class ResInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    if (context.switchToHttp().getRequest().url.includes("/external/callback"))
      return next.handle();

    return next.handle().pipe(
      map((data) => ({
        status: true,
        statusCode: context.switchToHttp().getResponse().statusCode,
        data,
      })),
    );
  }
}
