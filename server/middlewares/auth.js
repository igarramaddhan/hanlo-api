const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });

  const userToken = token.split(' ');
  //verify jwt
  jwt.verify(userToken[1], config.jwt_encryption, (error, decoded) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.body.auth = decoded;
    next();
  });
};
