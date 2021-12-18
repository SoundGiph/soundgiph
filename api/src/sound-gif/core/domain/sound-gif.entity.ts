import { Column, Entity, Index } from 'typeorm';
import { Base } from '../../../common/entities/base.entity';

@Entity('sound_gif')
export class SoundGifEntity extends Base {
  id!: string & { brand: 'soundGifId' };

  @Index({ fulltext: true })
  @Column({ nullable: false })
  description!: string;

  @Index({ fulltext: true })
  @Column('simple-array', { nullable: false })
  tags!: string[];

  @Index({ fulltext: true })
  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  audioUrl!: string;

  @Column({ nullable: false })
  imageUrl!: string;

  @Column({ nullable: false, default: 0 })
  sharedCount!: number;
}

export type SoundGifEntityMandatoryFields = Pick<
  SoundGifEntity,
  'title' | 'audioUrl' | 'imageUrl'
>;
