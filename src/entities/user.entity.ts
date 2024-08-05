import {
  BeforeCreate,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { hash } from 'bcrypt';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property({ default: true })
  isActive: boolean = true;

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);

  @BeforeCreate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
