import connection, { initializeDb } from '../../db/connection';
import { UserModel } from './UserModel';
import { seed } from '../seeders';

connection.addModels([
  UserModel,
]);

export async function configureDB () {
  await initializeDb();
  await connection.sync({
    alter: true,
  });
  await seed();
}

export default connection.models;
