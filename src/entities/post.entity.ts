import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  content!: string;

  @ManyToOne(() => User)
  author!: User;
}
