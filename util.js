const jwt = require('jsonwebtoken')
const config = require('./config')

// import jwt from 'jsonwebtoken';
// import config from './config';

const getToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,

  }, config.JWT_SECRET, {
    expiresIn: '48h'
  })
}

const removeToken = (req, res) => {
  // console.log({ headers: req.headers.authorization })
  // console.log("hello")
  // jwt.destroy(req.headers.authorization)
  return jwt.sign({}, config.JWT_SECRET)
}

const isAuth2 = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return
    });
  } else {
    return res.status(401).send({ msg: "Token is not supplied." });
  }
}

const isAdmin = (req, res, next) => {
  console.log(req.user)
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: 'Admin Token is not valid.' })
}

const isAuth = (req, res, next) => {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]
  console.log({ utils: token })
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// export {
//   getToken, isAuth, isAdmin
// }

module.exports = {
  getToken, isAuth, isAdmin, removeToken
}