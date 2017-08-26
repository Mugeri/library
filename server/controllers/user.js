const User = require('../models/user.js');

const UserCntrl = {
  create: (req, res) => {
    const newUser = new User();
    newUser.fullname = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.role = 'admin';

    newUser.save(() => {
      if(err){
        return res.status(500).send(err);
      }
      return res.status(200).send({ message: 'user created!'});
    });
  },

  update: (req, res) => {

  },

  read: (req, res) => {

  },

  delete: (req, res) => {

  }

}

module.exports = UserCntrl;
