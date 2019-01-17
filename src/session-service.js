const uuidv4 = require('uuid/v4');

const sessions = {};

module.exports = {
  all: sessions,
  get: id => sessions[id],
  create: (data) => {
    const id = uuidv4();
    sessions[id] = data;
    return id;
  },
  remove: (id) => {
    delete sessions[id];
  },
};
