import { Entity, PrimaryKey } from "@mikro-orm/core";

@Entity({ tableName: "FUrThreads_Tags" })
export class ThreadTags  {

  @PrimaryKey({ fieldName:"tag_id" })
  tagId: number;

  @PrimaryKey({ fieldName:"t_id" })
  tId: number;

}
