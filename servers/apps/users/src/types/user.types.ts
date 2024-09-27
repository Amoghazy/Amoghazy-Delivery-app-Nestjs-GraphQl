import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class RegistrationResponse {
  @Field()
  activationToken: string;
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
@ObjectType()
export class ActivationResponse {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  user?: User;
  @Field(() => String, { nullable: true })
  refreshToken?: string;
  @Field(() => String, { nullable: true })
  accessToken?: string;
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
@ObjectType()
export class LogoutResponse {
  @Field()
  message: string;
}
@ObjectType()
export class ForgetResponse {
  @Field()
  message: string;
}
@ObjectType()
export class ResetResponse {
  @Field()
  user: User;
}
