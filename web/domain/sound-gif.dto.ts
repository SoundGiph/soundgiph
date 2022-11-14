import { User } from "./User.dto";

export interface SoundgifDTO {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  audioUrl: string;
  imageUrl: string;
  sharedCount?: number;
  user?: Pick<User, "id" | "lastname" | "firstname" | "picture">;
}
