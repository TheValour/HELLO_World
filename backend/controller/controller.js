import Text from '../modal/ArticleModal.js';
import BoxPage from '../modal/BoxModal.js';
import User from '../modal/Model.js'
import { createSecretToken } from '../util/SecretToken.js';
import bcrypt from "bcrypt";

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

export const PostArticle = async (req, res, next) => {
  try {
    console.log(req.body.user)
    const { user, article } = req.body;
    
    const textResponse = await Text.create({  user, article });
    console.log(user.username)
    const boxResponse = await BoxPage.create({  
      "username":user.username, 
      "title":article.title, 
      "tags":article.tags, 
      "createdAt" : article.createdAt, 
      "_id":textResponse._id 
    });
    
    res
      .status(201)
      .json({ message: "User article posted successfully", success: true, textResponse });
    next();

  }catch (error) {
    console.error(error);
  }
}
export const FindArticle = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id)
    const postResponse = await Text.findOne({ _id });    
    res.status(200).json({ message: "User article", success: true, postResponse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
