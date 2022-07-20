import { GetTikTokUserPayload, AuthPort } from "src/auth/core/application/ports/auth.port";
import axios from "axios";

const TIK_TOK_BASIC_INFO_URL = `https://open-api.tiktok.com/user/info/`;

export class AuthAdapter implements AuthPort {
  async getTikTokUser(payload: GetTikTokUserPayload): Promise<void> {
    return axios.post(TIK_TOK_BASIC_INFO_URL, payload);
  }
}
