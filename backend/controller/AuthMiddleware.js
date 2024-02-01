import User from '../modal/Model.js'
import jwt from "jsonwebtoken";

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
