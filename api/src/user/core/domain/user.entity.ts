import { Column, Entity } from "typeorm";
import { Base } from "../../../common/entities/base.entity";

@Entity("user")
export class UserEntity extends Base {
  id!: string & { brand: "userId" };

  @Column({ nullable: false })
  deviceId!: string;

  @Column({ nullable: true })
  tiktokPayload!: string | null;

  @Column({ nullable: true })
  applePayload!: string | null;

  @Column({ nullable: true })
  googlePayload!: string | null;
}
