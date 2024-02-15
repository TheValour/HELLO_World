import Text from '../modal/ArticleModal.js';
import BoxPage from '../modal/BoxModal.js';
import TagList from '../modal/TagsModal.js';

export const PostArticle = async (req, res, next) => {
  try {
    console.log(req.body.user)
    const { user, article } = req.body;
    
    const textResponse = await Text.create({  user, article });
    const boxResponse = await BoxPage.create({  
      "username":user.username, 
      "title":article.title, 
      "tags":article.tags, 
      "createdAt" : article.createdAt, 
      "description" : article.description, 
      "image" : article.image, 
      "_id":textResponse._id 
    });

    insertTags(article.tags);

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

export const FindList = async (req, res) => {
  try {
    const listResponse = await BoxPage.find().limit(50)
    res.status(200).json({ message: "User article", success: true, listResponse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const FindTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const listResponse = await BoxPage.find({tags : {$in : tag} }).limit(50)
    res.status(200).json({ message: "User article Find", success: true, listResponse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
export const TagListControl = async (req, res) => {
  try {
    const listResponse = await TagList.find().sort({count:-1}).limit(10)
    res.status(200).json({ message: "User article Find", success: true, listResponse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const insertTags = async (tags) => {
  for(let  i=0; i<tags.length; i++) {
    const searchResponse = await TagList.find({'title':tags[i]})

    if(searchResponse.length) {
      await TagList.updateOne({'title':tags[i]}, {'count': searchResponse[0].count + 1});
    }
    else {
      await TagList.create({'title':tags[i], 'count': 1});
    }
  }
}