const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
  static registerUser(req, res){
    console.log(req.body);
    if (req.body.password === undefined || req.body.password.length === 0) {
      res.status(400).json({message: 'password is required'})
    }
    const saltUser = bcrypt.genSaltSync(8)
    const hashedPassword = bcrypt.hashSync(req.body.password, saltUser)
    User.create({
      email: req.body.email,
      password: hashedPassword
    })
    .then(user=>{
      console.log(user);
      const tokenUser = jwt.sign({
        id: user._id,
        email: user.email
      }, process.env.JWT_SECRET_KEY)
      console.log(tokenUser);
      res.status(200).json({message: 'user successfully registered!', data: { token: tokenUser, userId: user._id, email: user.email }})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static getUsers(req, res){
    User.find({})
    .then(users=>{
      // console.log(users);
      if (users.length === 0) {
        res.status(404).json({message: 'no users found!',data: users})
      }else {
        res.status(200).json({message: 'users found!',data: users})
      }
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static getOneUser(req, res){
    User.findOne({ _id: req.params.id })
    .then(user=>{
      // console.log(user);
      res.status(200).json({message: 'User successfully retrived',data: user})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static deleteUser(req, res){
    User.deleteOne({ _id: req.params.id })
    .then(result=>{
      res.status(200).json({message: 'user successfully deleted', data: result})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static updateUser(req, res){
    if (req.body.password === undefined || req.body.password.length === 0) {
      res.status(400).json({message: 'password is required to update'})
    }
    const saltUser = bcrypt.genSaltSync(8)
    const hashedPassword = bcrypt.hashSync(req.body.password, saltUser)
    User.updateOne({ _id: req.params.id }, {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    .then(result=>{
      res.status(200).json({message: 'user successfully updated!', result})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static login(req, res){
    User.findOne({ email: req.body.email})
    .then(user => {
      const passwordCheck = bcrypt.compareSync(req.body.password, user.password)
      // console.log(user.password);
      // console.log(passwordCheck);
      if (passwordCheck) {
        const tokenUser = jwt.sign({
          id: user._id,
          name: user.name,
          email: user.email
        }, process.env.JWT_SECRET_KEY)
        // console.log(tokenUser);
        res.status(200).json({token: tokenUser, userId: user._id, name: user.name, email: user.email })
        // req.headers.token = tokenUser
      }else {
        res.status(400).json({message: 'wrong password'})
      }
    })
    .catch(err=>{
      res.status(400).json({message: 'email is not found', err})
    })
  }
}

module.exports = UserController
