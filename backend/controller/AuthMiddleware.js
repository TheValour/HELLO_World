import User from '../modal/Model.js'
import jwt from "jsonwebtoken";
import { createSecretToken } from '../util/SecretToken.js';
import bcrypt from "bcrypt";

import dotenv from 'dotenv';
dotenv.config();

export const userVerification = (req, res) => {
  const {token} = req.body;

  if (!token) {
    return res.json({ status: false, message:'LogIn succesfully' })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user })
      else return res.json({ status: false })
    }
  })
}

export const Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt, title } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const userResponse = await User.create({ email, password, username, createdAt, title });
    console.log(user._id)
    const token = createSecretToken(user._id);
    const user = {
      "username":userResponse.username,
      "email" : userResponse.email
    }
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user, token });
    next();

  }catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const userResponse = await User.findOne({ email });
    if(!userResponse){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,userResponse.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
    const token = createSecretToken(userResponse._id);
    const user = {
      "username":userResponse.username,
      "email" : userResponse.email
    }

    res.status(201).json({ message: "User logged in successfully", success: true, token, user });
    next()
  } catch (error) {
    console.error(error);
  }
}
