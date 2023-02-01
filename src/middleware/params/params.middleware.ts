import { Injectable, NestMiddleware } from '@nestjs/common';
import { ParamsService } from './params.service';
import * as check from 'vkminiapps-params-checker';
import { UserDataDto } from 'src/dto/user-data.dto';

@Injectable()
export class ParamsMiddleware implements NestMiddleware {
  constructor(private readonly paramsService: ParamsService) {}

  async use(req: any, res: any, next: () => void) {
    if (
      !check(
        req?.headers?.authorization?.slice(7) || '',
        process.env.APP_SECRET_KEY,
        +process.env.AUTHORIZATION_LIFETIME || 0,
      )
    )
      return res.status(401).json({
        response: false,
        statusCode: 401,
        errorCode: 0,
      });

    const user_id = +req.headers.authorization
      .slice(7)
      .split('vk_user_id=')[1]
      .split('&')[0];

    const user: UserDataDto = await this.paramsService.getUser(user_id);

    req.headers = {
      ...req.headers,
      user,
    };

    next();
  }
}
