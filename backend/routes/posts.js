const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post("",(req,res,next)=>{
  const post = new Post({
    _id:req.id,
    title:req.body.title,
    content:req.body.content
  });
  post.save().then(createdPost =>{
    console.log('add posts result',createdPost);
    console.log(post);
    res.status(201).json({
      message:'posts added',
      id:createdPost._id
    });
  });
});

router.get("",(req,res,next)=>{
  Post.find()
    .then(documents =>{
      console.log(documents);
      res.status(200).json({
        message:'response from server',
        posts:documents
      });
    })
});

router.put("/:id" ,(req,res,next)=>{
  const post = new Post({
    _id:req.body.id,
    title:req.body.title,
    content:req.body.content
  });
  console.log('inside put');
  Post.updateOne({_id:req.params.id},post).then(result =>{
    console.log('result',result);
    res.status(200).json({
      message:'update successfull'
    });
  });
});

router.delete("/:id",(req,res,next)=>{
  console.log('request id  - ',req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result => {
    if(result.deletedCount === 0){
      console.log('no records found');
    }else{
      console.log('deleted success',result);
      res.status(200).json({
        message:'Post deleted successfully'
      })
    }
  })
});

module.exports = router;
