const user = require("./userModel");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    user.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { getAllUsers };
