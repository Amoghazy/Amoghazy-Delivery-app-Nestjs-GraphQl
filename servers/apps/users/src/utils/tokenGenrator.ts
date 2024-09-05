import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

export class TokenGenerator {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  generateAccessToken(userId: string): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.config.get("JWT_SECRET_ACCESS"),
        expiresIn: "1h",
      }
    );
  }

  generateRefreshToken(userId: string): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.config.get("JWT_SECRET_REFRESH"),
        expiresIn: "7d",
      }
    );
  }
}
