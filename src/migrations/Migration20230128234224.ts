import { Migration } from '@mikro-orm/migrations';

export class Migration20230128234224 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `FUsTagTypes` (`tagtype_id` int unsigned not null auto_increment primary key, `name` varchar(255) null default null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `FUsTagTypes` add unique `name`(`name`);');

    this.addSql('create table `FUdTags` (`tag_id` int unsigned not null auto_increment primary key, `name` varchar(128) null default \'NULL\', `tagtype_id` int unsigned null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `FUdTags` add unique `name`(`name`);');
    this.addSql('alter table `FUdTags` add index `fk_tag_tagtype`(`tagtype_id`);');

    this.addSql('create table `FUrThreads_Tags` (`tag_id` int unsigned not null, `t_id` int unsigned not null, primary key (`tag_id`, `t_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `FUdUsers` (`u_id` int unsigned not null auto_increment primary key, `username` varchar(32) not null, `password` char(128) not null, `salt` char(25) not null, `signature` mediumtext null default null, `email` varchar(128) not null, `avatar` varchar(200) null default null, `usergroup` int not null default 0, `regdate` datetime not null default current_timestamp(), `linkedin` varchar(128) null default null, `instagram` varchar(128) null default null, `facebook` varchar(128) null default null, `twitter` varchar(128) null default null, `github_gitlab` varchar(128) null default null, `birthday` varchar(128) null default null, `description` mediumtext null default null, `location` varchar(40) null default null, `career` varchar(128) null default null, `hidedata` bit(1) not null default 0, `lastip` varbinary(16) null default null, `active` bit(1) not null default 1) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `FUdUsers` add unique `username`(`username`);');
    this.addSql('alter table `FUdUsers` add unique `email`(`email`);');

    this.addSql('create table `FUdThreads` (`t_id` int unsigned not null auto_increment primary key, `u_id` int not null, `likes` json not null default 0, `subject` varchar(100) null default \'NULL\', `dateline` datetime not null default current_timestamp(), `views` json not null default 0, `message` text null default \'NULL\', `hide` bit(1) not null default 1) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `FUdAttachments` (`a_id` int unsigned not null, `t_id` int unsigned not null, `filename` varchar(128) not null, `filetype` varchar(120) null default null, `filesize` int null default null, `thumbnail` varchar(120) null default null, `downloads` json not null default 0, `attachname` varchar(128) null default null, primary key (`a_id`, `t_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `FUrReports` (`report_id` int unsigned not null, `t_id` int unsigned not null, `u_id` int unsigned null default NULL, `c_id` int null default null, `date` datetime not null default current_timestamp(), `cause` varchar(32) not null, `message` varchar(128) null default null, primary key (`report_id`, `t_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `FUrReports` add index `fk_report_thread`(`t_id`);');
    this.addSql('alter table `FUrReports` add index `fk_report_user`(`u_id`);');

    this.addSql('create table `FUdComments` (`c_id` int unsigned not null, `t_id` int unsigned not null, `u_id` int unsigned not null, `dateline` datetime not null default current_timestamp(), `message` text null, `replyto` int null default null, `hide` bit(1) not null default 1, primary key (`c_id`, `t_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `FUdComments` add index `fk_comment_thread`(`t_id`);');
    this.addSql('alter table `FUdComments` add index `fk_comment_user`(`u_id`);');

    this.addSql('create table `FUsUserGroups` (`userg_id` tinyint(1) not null, `name` varchar(32) not null, `canBan` bit(1) not null default 0, `canViewDashboard` bit(1) not null default 0, `canInsert` bit(1) not null default 0, `canDelete` bit(1) not null default 0, `canModTags` bit(1) not null default 0, `canCreate` bit(1) not null default 0, primary key (`userg_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `FUrViews` (`view_id` int unsigned not null, `t_id` int unsigned not null, `date` datetime not null default current_timestamp(), primary key (`view_id`, `t_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('alter table `FUdTags` add constraint `FUdTags_tagtype_id_foreign` foreign key (`tagtype_id`) references `FUsTagTypes` (`tagtype_id`) on update cascade on delete set null;');

    this.addSql('alter table `FUrReports` add constraint `FUrReports_t_id_foreign` foreign key (`t_id`) references `FUdThreads` (`t_id`) on update cascade on delete cascade;');
    this.addSql('alter table `FUrReports` add constraint `FUrReports_u_id_foreign` foreign key (`u_id`) references `FUdUsers` (`u_id`) on update cascade on delete set null;');

    this.addSql('alter table `FUdComments` add constraint `FUdComments_t_id_foreign` foreign key (`t_id`) references `FUdThreads` (`t_id`) on update cascade on delete cascade;');
    this.addSql('alter table `FUdComments` add constraint `FUdComments_u_id_foreign` foreign key (`u_id`) references `FUdUsers` (`u_id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `FUdTags` drop foreign key `FUdTags_tagtype_id_foreign`;');

    this.addSql('alter table `FUrReports` drop foreign key `FUrReports_u_id_foreign`;');

    this.addSql('alter table `FUdComments` drop foreign key `FUdComments_u_id_foreign`;');

    this.addSql('alter table `FUrReports` drop foreign key `FUrReports_t_id_foreign`;');

    this.addSql('alter table `FUdComments` drop foreign key `FUdComments_t_id_foreign`;');

    this.addSql('drop table if exists `FUsTagTypes`;');

    this.addSql('drop table if exists `FUdTags`;');

    this.addSql('drop table if exists `FUrThreads_Tags`;');

    this.addSql('drop table if exists `FUdUsers`;');

    this.addSql('drop table if exists `FUdThreads`;');

    this.addSql('drop table if exists `FUdAttachments`;');

    this.addSql('drop table if exists `FUrReports`;');

    this.addSql('drop table if exists `FUdComments`;');

    this.addSql('drop table if exists `FUsUserGroups`;');

    this.addSql('drop table if exists `FUrViews`;');
  }

}
