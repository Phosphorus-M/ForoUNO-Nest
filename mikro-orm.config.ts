import { MemoryCacheAdapter, Options } from '@mikro-orm/core';

const config: Options = {
    tsNode: process.env.NODE_DEV === "true" ? true : false,
    user: "root",
    password: "root",
    dbName: "foro",
    host: "localhost",
    port: 3306,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    type: "mariadb",
    debug: ["query", "query-params"],
    cache: {
      enabled: true,
      adapter: MemoryCacheAdapter,
      options:{
          expiration: 1000 * 60 * 60,
      }
    },
  };

export default config;