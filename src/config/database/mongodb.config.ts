import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://dbUser:abubakr@cluster0.8wqhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  entities: [],
  logging: true,
  synchronize: true,
};
