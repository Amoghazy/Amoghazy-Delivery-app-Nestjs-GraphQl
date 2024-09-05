import { sign } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

export class TokenGenerator {
  constructor(private readonly config: ConfigService) {}
  generateAccessToken(userId: string): string {
    return sign({ userId }, this.config.get("JWT_SECRET_ACCESS"), {
      expiresIn: "1h",
    });
  }

  generateRefreshToken(userId: string): string {
    return sign({ userId }, this.config.get("JWT_SECRET_REFRESH"), {
      expiresIn: "7d",
    });
  }
}
