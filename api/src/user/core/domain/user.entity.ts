import { Column, Entity } from "typeorm";
import { AuthSocialProvider } from "../../../auth/core/application/ports/auth.port";
import { Base } from "../../../common/entities/base.entity";

@Entity("user")
export class UserEntity extends Base {
  id!: string & { brand: "userId" };

  @Column()
  providerId!: string;

  @Column("enum", {
    enum: Object.values(AuthSocialProvider),
    default: null,
    nullable: true,
  })
  provider!: AuthSocialProvider | null;

  @Column({ nullable: true, default: null })
  firstname: string | null;

  @Column({ nullable: true, default: null })
  lastname: string | null;

  @Column({ nullable: true, default: null })
  picture: string | null;

  @Column()
  email!: string;

  @Column({ nullable: true, default: null })
  deviceId!: string | null;
}
