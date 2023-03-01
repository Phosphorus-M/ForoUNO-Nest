import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ tableName: "FUdUsers" })
export class User {

  @Field(() => Int)
  @PrimaryKey({ autoincrement: true })
  uId!: number;

  @Field()
  @Unique({ name: "username" })
  @Property({ length: 32 })
  username!: string;

  @Property({ columnType: "char(128)", length: 128 })
  password!: string;

  @Field()
  @Property({ columnType: "char(25)", length: 25 })
  salt!: string;

  @Field({ nullable: true })
  @Property({ columnType: "mediumtext", length: 16777215, nullable: true, default: null })
  signature?: string;

  @Field()
  @Unique({ name: "email" })
  @Property({ length: 128 })
  email!: string;

  @Field({ nullable: true })
  @Property({ length: 200, nullable: true, default: null })
  avatar?: string;

  @Field(() => Int)
  @Property({ default: 0 })
  usergroup: number;

  @Field()
  @Property({ defaultRaw: `current_timestamp()` })
  regdate!: Date;


  @Field({ nullable: true })
  @Property({ length: 128, nullable: true, default: null })
  linkedin?: string;

  @Field({ nullable: true })
  @Property({ length: 128, nullable: true, default: null })
  instagram?: string;

  @Field({ nullable: true })
  @Property({ length: 128, nullable: true, default: null })
  facebook?: string;

  @Field({ nullable: true })
  @Property({ length: 128, nullable: true, default: null })
  twitter?: string;

  @Field({ nullable: true })
  @Property({ length: 128, nullable: true, default: null })
  githubGitlab?: string;

  @Field({ nullable: true })
  @Property({ length: 128, nullable: true, default: null })
  birthday?: string;

  @Field({ nullable: true })
  @Property({ columnType: "mediumtext", length: 16777215, nullable: true, default: null })
  description?: string;

  @Field({ nullable: true })
  @Property({ length: 40, nullable: true, default: null })
  location?: string;

  @Field({ nullable: true })
  @Property({ length: 128, nullable: true, default: null })
  career?: string;

  @Field()
  @Property({ columnType: "bit(1)", default: 0 })
  hidedata!: boolean;

  @Field({ nullable: true })
  @Property({ columnType: "varbinary(16)", length: 16, nullable: true, default: null })
  lastip?: string;

  @Field()
  @Property({ columnType: "bit(1)", default: 1 })
  active!: boolean;

}
