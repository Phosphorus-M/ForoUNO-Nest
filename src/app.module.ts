import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createContext } from './context';
import { ThreadResolver } from './resolvers/threads.resolver';
import { ThreadService } from './services/threads.service';
import { SecondService } from './second.service';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: "schema.gql",
      // context: request => createContext(request)
    })
  ],
  controllers: [AppController],
  providers: [AppService, SecondService, ThreadResolver, ThreadService],
})
export class AppModule {}