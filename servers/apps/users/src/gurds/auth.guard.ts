import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../../../prisma/prisma.service";
import { TokenGenerator } from "../utils/tokenGenrator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService
  ) {}
  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    if (!req || !req.headers) {
      return false;
    }
    const accessToken = req.headers["accesstoken"];
    const refreshToken = req.headers["refreshtoken"];

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException(
        "Access token and refresh token are required"
      );
    }
    try {
      const decodedAccessToken = this.jwtService.verify(accessToken, {
        secret: this.config.get("JWT_SECRET_ACCESS"),
      });

      if (!decodedAccessToken) {
        throw new UnauthorizedException("Invalid access token");
      }

      await this.updateAccessToken(req);
    } catch (error) {
      Logger.error(`Error in AuthGuard: ${error.message}`);
      throw new UnauthorizedException("Unauthorized");
    }
    return true;
  }
  private async updateAccessToken(req: any) {
    try {
      const refreshToken = req.headers["refreshtoken"];
      const decodedRefreshToken = this.jwtService.verify(refreshToken, {
        secret: this.config.get("JWT_SECRET_REFRESH"),
      });

      if (!decodedRefreshToken) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      const user = await this.prisma.users.findUnique({
        where: { id: decodedRefreshToken.userId },
      });

      if (!user) {
        throw new UnauthorizedException("User not found");
      }
      const tokenGenerator = new TokenGenerator(this.config, this.jwtService);
      const newAccessToken = tokenGenerator.generateAccessToken(user.id);
      const newRefreshToken = tokenGenerator.generateRefreshToken(user.id);
      req.accessToken = newAccessToken;
      req.refreshToken = newRefreshToken;
      req.user = user;
    } catch (err) {
      Logger.error("Error updating access token", err);
      throw new UnauthorizedException("Error updating access token");
    }
  }
}
