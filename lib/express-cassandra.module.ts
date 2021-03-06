import { DynamicModule, Module } from '@nestjs/common';
import { ExpressCassandraCoreModule } from './express-casandra-core.module';
import {
  ExpressCassandraModuleOptions,
  ExpressCassandraModuleAsyncOptions,
} from './interfaces';
import { createExpressCassandraProviders } from './express-cassandra.providers';
import { ConnectionOptions, Connection } from './orm';

@Module({})
export class ExpressCassandraModule {
  static forRoot(options: ExpressCassandraModuleOptions): DynamicModule {
    return {
      module: ExpressCassandraModule,
      imports: [ExpressCassandraCoreModule.forRoot(options)],
    };
  }

  static forFeature(
    entities: Function[] = [],
    connection: Connection | ConnectionOptions | string = 'default',
  ): DynamicModule {
    const providers = createExpressCassandraProviders(entities, connection);
    return {
      module: ExpressCassandraModule,
      providers,
      exports: providers,
    };
  }

  static forRootAsync(
    options: ExpressCassandraModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: ExpressCassandraModule,
      imports: [ExpressCassandraCoreModule.forRootAsync(options)],
    };
  }
}
