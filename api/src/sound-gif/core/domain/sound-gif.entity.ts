import { Column, Entity, Index } from 'typeorm';
import { Base } from '../../../common/entities/base.entity';

@Entity('sound_gif')
export class SoundGifEntity extends Base {
  id!: string & { brand: 'soundGifId' };

  @Index({ fulltext: true })
  @Column({ nullable: true })
  description!: string | null;

  @Index({ fulltext: true })
  @Column({ nullable: true })
  personalityName!: string | null;

  @Index({ fulltext: true })
  @Column({ nullable: false })
  audioTitle!: string;

  @Column({ nullable: false })
  audioUrl!: string;

  @Column({ nullable: false })
  imageUrl!: string;

  @Column({ nullable: false, default: 0 })
  sharedCount!: number;
}
