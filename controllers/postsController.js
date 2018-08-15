const Post = require('../models/post')

class PostController {
  static addPost(req, res){
    console.log(req.body);
    Post.create({
      imageUrl: req.body.imageUrl,
      caption: req.body.caption,
      uploader: req.body.uploader
    })
    .then(post=>{
      console.log(post);
      res.status(200).json({message: 'post successfully saved!', data: { imageUrl: post.imageUrl, caption: post.caption, uploader: post.uploader }})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static getPosts(req, res){
    Post.find({})
    .then(posts=>{
      // console.log(posts);
      if (posts.length === 0) {
        res.status(404).json({message: 'no posts found!',data: posts})
      }
      res.status(200).json({message: 'posts retrived!',data: posts})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static getOnePost(req, res){
    Post.findOne({ _id: req.params.id })
    .then(post=>{
      // console.log(post);
      res.status(200).json({message: 'Post successfully retrived!',data: post})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static getPostByUploader(req, res){
    Post.find({ uploader: req.params.userId })
    .then(posts=>{
      console.log(posts);
      res.status(200).json({message: 'Post(s) successfully retrived!',data: posts})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static deletePost(req, res){
    Post.deleteOne({ _id: req.params.id })
    .then(result=>{
      res.status(200).json({message: 'post successfully deleted', data: result})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
  static updatePost(req, res){
    Post.updateOne({ _id: req.params.id }, {
      caption: req.body.caption
    })
    .then(result=>{
      res.status(200).json({message: 'post successfully updated!', result})
    })
    .catch(err=>{
      res.status(400).json({message: 'something went wrong!', err})
    })
  }
}

module.exports = PostController
