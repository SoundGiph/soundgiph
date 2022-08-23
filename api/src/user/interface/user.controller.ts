import { Controller, Get, HttpException, Query, Req, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AuthGuard } from "@nestjs/passport";
import { DeleteUserCommand } from "../core/application/commands/delete-user/delete-user.command";
import { UserEntity } from "../core/domain/user.entity";
import { UNAUTHORIZED_TO_GET_ME } from "../core/domain/user.errors";

export interface UserAuthenticatedRequest extends Request {
  user?: UserEntity;
}

@Controller("user")
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AuthGuard())
  @Get("me")
  async getMe(@Req() req: UserAuthenticatedRequest): Promise<UserEntity> {
    if (!req.user) {
      throw new HttpException(UNAUTHORIZED_TO_GET_ME, 401);
    }
    return req.user;
  }

  @UseGuards(AuthGuard())
  @Get("delete")
  async deleteUser(@Query() query: Record<string, { id?: string }>): Promise<boolean> {
    const { id } = query;
    if (!id) throw new HttpException(UNAUTHORIZED_TO_GET_ME, 401);
    return await this.commandBus.execute<DeleteUserCommand>(
      new DeleteUserCommand(id as UserEntity["id"])
    );
  }
}
