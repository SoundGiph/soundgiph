import { Column, Entity, Index } from "typeorm";
import { Base } from "../../../common/entities/base.entity";

export enum Categories {
  "News" = "News",
  "Anime" = "Anime",
  "Movies" = "Movies",
  "Cartoons" = "Cartoons",
  "Gaming" = "Gaming",
  "Comedy" = "Comedy",
  "Social" = "Social",
  "Memes" = "Memes",
  "Music" = "Music",
  "Sport" = "Sport",
  "TV" = "TV",
}

@Entity("sound_gif")
export class SoundGifEntity extends Base {
  id!: string & { brand: "soundGifId" };

  @Index({ fulltext: true })
  @Column({ nullable: false })
  description!: string;

  @Index({ fulltext: true })
  @Column("simple-array", { nullable: false })
  tags!: string[];

  @Column("enum", { enum: Object.values(Categories), nullable: false })
  categories!: Categories[];

  @Column("simple-array", { nullable: false })
  reactions!: string[];

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
  "title" | "audioUrl" | "imageUrl" | "reactions" | "categories" | "description" | "tags"
>;
