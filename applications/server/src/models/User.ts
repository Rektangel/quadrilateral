/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Available user roles',
});

@ObjectType({ description: 'The User model' })
export class User extends TimeStamps {
  @Field(() => ID)
  readonly id!: string;

  @Field()
  @Property({ required: true, unique: true })
  username!: string;

  @Field((type) => [String])
  @Property({
    type: String,
    required: true,
    default: [UserRole.USER],
    enum: UserRole,
  })
  roles!: UserRole[];

  // This has no `@Field()`, so the property is not public in the schema
  @Property({ required: true })
  password!: string;

  @Field()
  readonly createdAt!: Date;
}

export const UserModel = getModelForClass(User);
