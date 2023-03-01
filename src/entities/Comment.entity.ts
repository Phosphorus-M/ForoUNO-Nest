import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Thread } from "./Thread.entity";
import { User } from "./User.entity";

@ObjectType()
@Entity({ tableName: "FUdComments" })
export class Comment {

  @Field(() => Int)
  @PrimaryKey()
  cId!: number;

  @Field(() => Int, { name: "tId" })
  @Property({ fieldName: "t_id", primary: true })
  tId!: number;

  @Field(() => Thread, { name: "thread" })
  @ManyToOne({ entity: () => Thread, fieldName: "t_id", onDelete: "cascade", index: "fk_comment_thread" })
  thread!: Thread;

  @Field(() => Int)
  @Property({ fieldName: "u_id" })
  uId!: number;

  @Field({ name: "user" })
  @ManyToOne({ entity: () => User, fieldName: "u_id", onDelete: "cascade", index: "fk_comment_user", eager: true })
  user!: User;

  @Field()
  @Property({ defaultRaw: `current_timestamp()` })
  dateline!: Date;

  @Field({ nullable: true })
  @Property({ columnType: "text", length: 65535, nullable: true })
  message?: string;

  @Field(() => Int)
  @Property({ nullable: true, default: null })
  replyto?: number = null;

  @Field()
  @Property({ columnType: "bit(1)", default: 1 })
  hide!: boolean;

}
