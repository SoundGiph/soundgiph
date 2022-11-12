import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Base } from "../../../common/entities/base.entity";
import { UserEntity } from "../../../user/core/domain/user.entity";

@Entity("sound_gif_to_approve")
export class SoundGifToApproveEntity extends Base {
  id!: string & { brand: "soundGifToApproveId" };

  @Index({ fulltext: true })
  @Column({ nullable: false })
  description!: string;

  @Index({ fulltext: true })
  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  audioUrl!: string;

  @Column({ nullable: false })
  imageUrl!: string;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;
}
