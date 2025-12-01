import { faker } from '@faker-js/faker';

const randomName = faker.person.fullName();

console.log(randomName);
const first = faker.person.firstName();
const last = faker.person.lastName();

console.log(first, last);
const randomEmail = faker.internet.email({ firstName: first, lastName: last });

console.log(randomEmail);