import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Thread } from "./Thread.entity";

@ObjectType("Attachment", { description: "Attachment" })
@Entity({ tableName: "FUdAttachments" })
export class Attachment {

  @Field(() => Int)
  @PrimaryKey()
  aId: number;

  @Field(() => Int, { name: "tId" })
  @Property({ fieldName: "t_id", primary: true })
  tId!: number;

  @Field(() => Thread, { name: "thread" })
  @ManyToOne({ entity: () => Thread, fieldName: "t_id", onDelete: "cascade", index: "fk_thread_attach", persist: false })
  thread!: Thread;


  @Field()
  @Property({ length: 128 })
  filename!: string;

  @Field()
  @Property({ length: 120, nullable: true, default: null })
  filetype?: string;

  @Field()
  @Property({ nullable: true, default: null })
  filesize?: number = null;

  @Field({ nullable: true })
  @Property({ length: 120, nullable: true, default: null })
  thumbnail?: string;

  @Field(() => Int)
  @Property({ default: 0 })
  downloads = 0;

  @Field({ nullable: true })
  @Property({ length: 128, nullable: true, default: null })
  attachname?: string;

  @Field()
  @Property({ nullable: true, defaultRaw: "unix_timestamp()", persist: false })
  dateupload?: number;

}
