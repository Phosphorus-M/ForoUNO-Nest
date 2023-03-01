import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Thread } from "./Thread.entity";
import { TagType } from "./TagType.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ tableName: "FUdTags" })
export class Tag {

  @Field(() => Int)
  @PrimaryKey()
  tagId!: number;

  @Field({ nullable: true })
  @Unique({ name: "name" })
  @Property({ length: 128, nullable: true, default: "NULL" })
  name?: string;

  @Field(() => Int)
  @Property({ fieldName: "tagtype_id" })
  tagtypeId!: number;

  @Field(() => TagType, { nullable: true })
  @ManyToOne({ entity: () => TagType, fieldName: "tagtype_id", nullable: true,  index: "fk_tag_tagtype", eager: true })
  tagtype?: TagType;

  @Field(() => [Thread], { name: "threads" })
  @ManyToMany({ entity: () => Thread, pivotTable: "FUrThreads_Tags", joinColumn: "tag_id", inverseJoinColumn: "t_id" })
  threads = new Collection<Thread>(this);

}
