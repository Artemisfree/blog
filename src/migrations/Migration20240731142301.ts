import { Migration } from '@mikro-orm/migrations';

export class Migration20240731142301 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "is_active" boolean not null default true);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "post" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "author_id" int not null);');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_author_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "post" cascade;');
  }

}
