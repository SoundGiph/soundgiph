import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Base } from "../../../common/entities/base.entity";
import { UserEntity } from "../../../user/core/domain/user.entity";

export enum Categories {
  News = "News",
  Anime = "Anime",
  Movies = "Movies",
  Cartoons = "Cartoons",
  Gaming = "Gaming",
  Comedy = "Comedy",
  Social = "Social",
  Memes = "Memes",
  Music = "Music",
  Sports = "Sports",
  TV = "TV",
}

export const categoriesTransformer = {
  to: (categories: Categories[]): string[] | string => {
    if (categories.length == 1) {
      return "{" + categories.filter(category => category).join(",") + "}";
    }
    return categories;
  },
  from: (categories: string): string => categories,
};

@Entity("sound_gif")
export class SoundGifEntity extends Base {
  id!: string & { brand: "soundGifId" };

  @Index({ fulltext: true })
  @Column({ nullable: false })
  description!: string;

  @Index({ fulltext: true })
  @Column("simple-array", { nullable: false })
  tags!: string[];

  @Column("enum", {
    enum: Object.values(Categories),
    default: [Categories.Comedy],
    array: true,
    transformer: categoriesTransformer,
  })
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

  @ManyToOne(() => UserEntity, { nullable: true })
  user!: UserEntity | null;
}

export type SoundGifEntityMandatoryFields = Pick<
  SoundGifEntity,
  "title" | "audioUrl" | "imageUrl" | "reactions" | "categories" | "description" | "tags"
>;
