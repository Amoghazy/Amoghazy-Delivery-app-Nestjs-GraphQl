import { ObjectType, Field, Directive } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class Avatars {
  @Field()
  id: string;
  @Field()
  url: string;
  @Field()
  user_id: string;
  @Field()
  public_id: string;
}
@ObjectType()
export class User {
  @Field()
  id: string;
  @Field({ nullable: true })
  address: string;

  @Field()
  username: string;

  @Field()
  email: string;
  @Field()
  phone: string;

  @Field(() => Avatars, { nullable: true })
  avatar?: Avatars;

  @Field()
  password: string;
  @Field({ defaultValue: false })
  isActive: boolean;
  @Field({ nullable: true })
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
