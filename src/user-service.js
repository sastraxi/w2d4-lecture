const bcrypt = require('bcrypt');

const ROUNDS = 10;

const hash = (plaintext) => {
  const salt = bcrypt.genSaltSync(ROUNDS);
  return bcrypt.hashSync(plaintext, salt);
};

const users = [
  {
    id: 1,
    name: 'betty',
    password: hash('beatrice123'),
  },
  {
    id: 2,
    name: 'miguel',
    password: hash('abc123'),
  }
];

module.exports = {
  all: users,
  find: predicate => users.find(predicate), // could be written with bind
  challenge: (username, password) => {
    const user = users.find(x => x.name === username);
    if (!user) return null;
    return bcrypt.compareSync(password, user.password)
      ? user
      : null;
  },
};
