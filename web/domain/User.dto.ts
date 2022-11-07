export enum AuthSocialProvider {
  GOOGLE = "GOOGLE",
}

export interface User {
  id: string;
  providerId: string;
  email: string;
  firstname: string;
  lastname: string;
  picture: string;
  provider: AuthSocialProvider;
}
