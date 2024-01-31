import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

export const createSecretToken = (id, email, username) => {
  return jwt.sign({ id, email, username }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
