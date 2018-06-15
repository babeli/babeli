import { factory, SequelizeAdapter } from 'factory-girl';
import faker from 'faker';
import { User } from '../';

factory.setAdapter(new SequelizeAdapter());

factory.define('User', User, {
  email: () => faker.internet.email(),
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  password: () => faker.internet.password(),
});

export default factory;
