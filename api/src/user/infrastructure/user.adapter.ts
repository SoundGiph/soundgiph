import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UserPort } from "../core/application/ports/user.port";
import { UserEntity } from "../core/domain/user.entity";

export class UserAdapter implements UserPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne(options);
  }

  public async create(payload: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(payload);
    return await this.userRepository.save(user);
  }

  public async delete(id: UserEntity["id"]): Promise<boolean> {
    const isDeleted = await this.userRepository.delete(id);
    return Boolean(isDeleted.affected);
  }
}
