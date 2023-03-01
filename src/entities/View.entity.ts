import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Thread } from "./Thread.entity";

@ObjectType()
@Entity({ tableName: "FUrViews" })
export class View {

  @Field(() => Int)
  @PrimaryKey({ autoincrement: true })
  viewId: number;


  @Field(() => Int)
  @PrimaryKey({ fieldName: "t_id" })
  tId: number;

  @ManyToOne({ entity: () => Thread, fieldName: "t_id", hidden:true, onDelete: "cascade", index: "fk_view_thread", nullable: true, eager: false, persist: false })
  thread: Thread;

  @Property({ defaultRaw: `current_timestamp()` })
  date!: Date;

}
