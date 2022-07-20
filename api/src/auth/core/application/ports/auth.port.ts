export interface GetTikTokUserPayload {
  accessToken: string;
  openId: string;
}

export abstract class AuthPort {
  abstract getTikTokUser(payload: GetTikTokUserPayload): Promise<void>;
}
