import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import mikroOrmConfig from '../mikro-orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { UsersController } from './user/user.controller';
import { UsersService } from './user/user.service';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    AuthModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
