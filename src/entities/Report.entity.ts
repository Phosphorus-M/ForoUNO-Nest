import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Thread } from "./Thread.entity";
import { User } from "./User.entity";

@Entity({ tableName: "FUrReports" })
export class Report {

  @PrimaryKey()
  reportId!: number;

  @ManyToOne({ entity: () => Thread, fieldName: "t_id", onDelete: "cascade", primary: true, index: "fk_report_thread" })
  tId!: Thread;

  @ManyToOne({ entity: () => User, fieldName: "u_id", nullable: true, defaultRaw: `NULL`, index: "fk_report_user" })
  uId?: User;

  @Property({ nullable: true, default: null })
  cId?: number = null;

  @Property({ defaultRaw: `current_timestamp()` })
  date!: Date;

  @Property({ length: 32 })
  cause!: string;

  @Property({ length: 128, nullable: true, default: null })
  message?: string;

}
