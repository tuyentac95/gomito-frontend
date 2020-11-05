export class LoginResponse {
  authenticationToken: string;
  username: string;
  userId?: number;
  refreshToken: string;
  expiresAt: Date;
}
