import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserPort } from "../core/application/ports/user.port";
import { UserEntity } from "../core/domain/user.entity";

export class UserAdapter implements UserPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async findOne(id: UserEntity["id"]): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail(id);
  }
}
