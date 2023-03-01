import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ tableName: "FUsTagTypes" })
export class TagType {

  @Field(() => Int, { nullable: true })
  @PrimaryKey({ nullable: true,fieldName:"tagtype_id" })
  tagtypeId!: number;

  @Field({ name: "tag_name", nullable: true })
  @Unique({ name: "name" })
  @Property({ nullable: true, default: null, fieldName:"name" })
  tag_name?: string;

}
