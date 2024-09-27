import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import {
  ActivationDto,
  CreateUserDto,
  LoginUserDto,
  ResetPasswordDto,
} from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { PrismaService } from "../../../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { EmailService } from "./email/email.service";
import { Response } from "express";
import { TokenGenerator } from "./utils/tokenGenrator";

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createUser(createUserDto: CreateUserDto, response: Response) {
    const { email, password, username, phone } = createUserDto;

    const existingUser = await this.prisma.users.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    if (existingUser) {
      throw new BadRequestException(
        "User with this email or phone already exists",
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      username,
      password: hashedPassword,
      phone,
    };

    const activation = await this.generateActivationToken(user);
    await this.emailService.sendMail({
      email: user.email,
      name: user.username,
      subject: "Activation Code",
      template: "./activation-mail.ejs",
      activationCode: String(activation.activationCode),
    });
    await this.prisma.users.create({
      data: user,
    });
    return {
      activationToken: activation.activationToken,
      response,
    };
  }
  async generateActivationToken(user: { email: string }) {
    const activationCode = Math.floor(100000 + Math.random() * 900000);
    const payload = {
      email: user.email,
      activationCode,
    };
    const activationToken = this.jwtService.sign(payload, {
      expiresIn: "15m",
      secret: this.configService.get("JWT_SECRET"),
    });
    return {
      activationToken,
      activationCode,
    };
  }
  async activateUser(activationDto: ActivationDto) {
    const { activationCode, activationToken } = activationDto;
    const payload = await this.jwtService.verify(activationToken, {
      secret: this.configService.get("JWT_SECRET"),
    });

    if (!payload) {
      throw new BadRequestException("Invalid activation token");
    }

    if (payload.activationCode !== +activationCode) {
      throw new BadRequestException("Invalid activation code");
    }
    const user = await this.prisma.users.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      throw new BadRequestException("User not found");
    }

    await this.prisma.users.update({
      where: { email: payload.email },
      data: { isActive: true },
    });
    return {
      user,
    };
  }
  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    if (!user.isActive) {
      throw new UnauthorizedException("User account is not activated");
    }

    const token = new TokenGenerator(this.configService, this.jwtService);
    const accessToken = token.generateAccessToken(user.id);
    const refreshToken = token.generateRefreshToken(user.id);
    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }
  async logOut(req: any) {
    req.refreshtoken = null;
    req.accesstoken = null;
    req.user = null;

    return {
      message: "Logged out successfully",
    };
  }
  async genratePasswordToken(user: User) {
    const forgetPasswordToken = this.jwtService.sign(
      { user },
      {
        secret: this.configService.get("JWT_SECRET_FORGET_PASSWORD"),
        expiresIn: "5m",
      },
    );
    return forgetPasswordToken;
  }
  async forgetPassword(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException("user not found !");
    }
    const tokenForget = await this.genratePasswordToken(user);
    const forgetUrl =
      this.configService.get("CLIENT_SIDE_URL_USER") +
      `reset-password?verify=${tokenForget}`;

    this.emailService.sendMail({
      name: user.username,
      subject: "Rest Password",
      template: "./forgot-password",
      email,
      activationCode: forgetUrl,
    });

    return {
      message: "request for forgetPassword is send! ",
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { password, token } = resetPasswordDto;
    if (!token) {
      throw new BadRequestException("Token Invalid Try Again reset password");
    }
    try {
      const decode = await this.jwtService.verify(token, {
        secret: this.configService.get("JWT_SECRET_FORGET_PASSWORD"),
      });
      if (!decode || decode?.exp * 1000 < Date.now()) {
        throw new BadRequestException("Token Invalid Try Again");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.users.update({
        where: { id: decode?.user?.id },
        data: {
          password: hashedPassword,
        },
      });
      if (!user) {
        throw new BadRequestException("User not found");
      }

      return { user };
    } catch (error) {
      throw new BadRequestException(
        " Try Again reset password we have some problem",
      );
    }
  }
  async getLoginUser(req: any) {
    const refreshToken = req.refreshToken;
    const accessToken = req.accessToken;
    const user = req.user;
    return {
      refreshToken,
      accessToken,
      user,
    };
  }

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.users.findMany({});
    return users;
  }
  async findUserById(id: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return user;
  }
}
