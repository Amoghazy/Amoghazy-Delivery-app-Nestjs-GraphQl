import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import {
  ActivationDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from "./dto/user.dto";
import {
  ActivationResponse,
  LoginResponse,
  LogoutResponse,
  RegistrationResponse,
} from "./types/user.types";
import { Response } from "express";
import { HttpCode, HttpStatus, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./gurds/auth.guard";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => RegistrationResponse)
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Args("createUserInput") createUserInput: CreateUserDto,
    @Context() context: { res: Response }
  ) {
    const registrationResponse = await this.usersService.createUser(
      createUserInput,
      context.res
    );
    const { activationToken } = registrationResponse;
    context.res.status(HttpStatus.CREATED);
    return {
      activationToken,
    };
  }
  @Mutation(() => ActivationResponse)
  async activateUser(@Args("activationDto") activationDto: ActivationDto) {
    const activationResponse =
      await this.usersService.activateUser(activationDto);

    const { user } = activationResponse;
    return user;
  }
  @Mutation(() => LoginResponse)
  async loginUser(@Args("loginUserInput") loginUserInput: LoginUserDto) {
    const res = await this.usersService.login(loginUserInput);

    return res;
  }
  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async getLoginUsers(@Context() context: { req: any }) {
    return this.usersService.getLoginUser(context.req);
  }

  @Query(() => LogoutResponse)
  @UseGuards(AuthGuard)
  async logOut(@Context() context: { req: any }) {
    const res = await this.usersService.logOut(context.req);
    return res;
  }
  @Query(() => [User])
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @Query(() => User)
  findUserById(@Args("id") id: string) {
    return this.usersService.findUserById(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args("id", { type: () => String }) id: string) {
  //   return this.usersService.remove(id);
  // }
}
