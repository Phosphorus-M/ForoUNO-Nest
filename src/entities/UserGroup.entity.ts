import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "FUsUserGroups" })
export class UserGroup {

  @PrimaryKey()
  usergId!: boolean;

  @Property({ length: 32 })
  name!: string;

  @Property({ fieldName: "canBan", columnType: "bit(1)", default: 0 })
  canBan!: boolean;

  @Property({ fieldName: "canViewDashboard", columnType: "bit(1)", default: 0 })
  canViewDashboard!: boolean;

  @Property({ fieldName: "canInsert", columnType: "bit(1)", default: 0 })
  canInsert!: boolean;

  @Property({ fieldName: "canDelete", columnType: "bit(1)", default: 0 })
  canDelete!: boolean;

  @Property({ fieldName: "canModTags", columnType: "bit(1)", default: 0 })
  canModTags!: boolean;

  @Property({ fieldName: "canCreate", columnType: "bit(1)", default: 0 })
  canCreate!: boolean;

}
