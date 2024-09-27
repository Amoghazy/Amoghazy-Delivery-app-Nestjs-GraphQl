import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty({ message: "Username is required" })
  @IsString({ message: "Username must be a string" })
  username: string;

  @Field()
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @Field()
  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
  @Field({ defaultValue: false })
  isActive: boolean;
  @Field()
  @IsNotEmpty({ message: "Phone number is required" })
  phone: string;
}

@InputType()
export class ActivationDto {
  @Field()
  @IsNotEmpty({ message: "Activation code is required" })
  @IsString({ message: "Activation code must be a string" })
  activationCode: string;

  @Field()
  @IsNotEmpty({ message: "Activation token is required" })
  @IsString({ message: "Activation token must be a string" })
  activationToken: string;
}

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsString({ message: "Username must be a string" })
  readonly username?: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: "Invalid email format" })
  readonly email?: string;

  @Field({ nullable: true })
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  readonly password?: string;
}

@InputType()
export class LoginUserDto {
  @Field()
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  readonly email: string;

  @Field()
  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  readonly password: string;
}
@InputType()
export class ResetPasswordDto {
  @Field()
  @IsNotEmpty({ message: "password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @Field()
  @IsNotEmpty({ message: "token is required" })
  @IsString({ message: "token must be a string" })
  token: string;
}
