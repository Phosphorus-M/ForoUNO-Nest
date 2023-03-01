import { Collection, Entity, EventArgs, ManyToMany, ManyToOne, OneToMany, OnLoad, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import type { EntityManager } from "@mikro-orm/mariadb";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Comment } from "./Comment.entity";
import { Tag } from "./Tag.entity";
import { View } from "./View.entity";
import { User } from "./User.entity";
import { SoftDelete } from "../validators/SoftDelete.decorator";
import { Attachment } from "./Attachment.entity";


@SoftDelete({ field:"hide" })
@ObjectType("Thread", { description: "Return a list of threads" })
@Entity({ tableName: "FUdThreads" })
export class Thread {

  [OptionalProps]?: "user";

  @Field(() => Int)
  @PrimaryKey()
  tId!: number;

  @Field(() => Int)
  @Property({ fieldName: "u_id" })
  uId!: number;

  @Field({ name: "user" })
  @ManyToOne({ entity: () => User, fieldName: "u_id", onDelete: "cascade", index: "fk_thread_user", persist: false })
  user: User;

  @Field(() => Int)
  @Property({ default: 0 })
  likes = 0;

  @Field({ nullable: true })
  @Property({ length: 100, nullable: true, default: "NULL" })
  subject?: string;

  @Field()
  @Property({ defaultRaw: `current_timestamp()` })
  dateline!: Date;

  @Field(() => Int)
  @Property({ default: 0 })
  views = 0;

  @Field({ nullable: true })
  @Property({ columnType: "text", length: 65535, nullable: true, default: "NULL" })
  message?: string;

  @Field()
  @Property({ columnType: "bit(1)", default: 1 })
  hide!: boolean;


  @Field(() => [Comment], { name: "comments" })
  @OneToMany(() => Comment, comment => comment.thread, { eager: true })
  comments?: Collection<Comment>;

  @Field(() => [Tag], { name: "tags" })
  @ManyToMany({ entity: () => Tag, pivotTable: "FUrThreads_Tags", joinColumn: "t_id", inverseJoinColumn: "tag_id" })
  FUrThreadsTags?: Collection<Tag> = new Collection<Tag>(this);

  @OneToMany(() => View, view => view.thread)
  view_schema?: Collection<View>;

  @Field(() => [Attachment], { name: "attachments" })
  @OneToMany(() => Attachment, attachment => attachment.thread, { eager: true })
  attachments?: Collection<Attachment> = new Collection<Attachment>(this);


  static async getPopulars(limit: number, offset: number, em: EntityManager) {
    const ten_days_ago = new Date();
    ten_days_ago.setDate(ten_days_ago.getDate() - 10);

    const results = await em.getRepository(Thread).find({
      view_schema:{
        date:{
          $gte: ten_days_ago,
          $lt: new Date()
        }
      }
    },{
      limit,
      offset
    });

    await em.populate(results, true);
    console.log("results", results[0]);
    return results;
  }

  @OnLoad()
  async onLoad(args: EventArgs<this>) {
    args.entity.views++;
    args.em.persist(args.entity);
    args.em.create(View, {
      tId: this.tId,
      date: new Date()
    },{
      persist: true
    });
  }

}
