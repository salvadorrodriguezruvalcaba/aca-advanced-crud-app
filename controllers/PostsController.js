const PostModel = require('../models/PostModel.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog-list');
mongoose.Promise = global.Promise;

module.exports =  {
  list: function( req, res, next) {
    PostModel.find().exec()
      .then(posts => res.render('posts', {posts}))
      .catch(err => next(err));
  },

  view: function( req, res, next) {
    PostModel.find({_id: req.params.id}).exec()
      .then(posts => res.render('post', {posts}))  // res.json(posts))
      .catch(err => next(err));
  },

  post_form: function(req, res, next) {
     res.render('post_form', {title: 'New Post'}).exec()
     .catch(err => next(err));
   },

  create: function (req, res, next) {
       new PostModel({
             _id: req.body.id,
             title : req.body.title,
             author : req.body.author,
             date : req.body.date,
             text : req.body.text
       }).save()
       .then(res.redirect('/posts'))
       .catch(err => next(err));
     },

   edit_form: function(req, res, next) {
      PostModel.findById({ _id: req.params.id }).exec()
      .then(post => res.render('post_edit_form', { post }))
      .catch(err => next(err));
    },

  update: function(req, res, next) {
    PostModel.findByIdAndUpdate({ _id: req.params.id }, {
      author: req.body.author,
      title: req.body.title,
      date: req.body.date,
      text: req.body.text
    }, { new: true }).exec()
    // .then(posts => res.render('post_edit_form', {posts})) // then(posts => res.json(posts))
    .then(res.redirect('/posts'))
    .catch(err => next(err))
  },

  delete: function(req, res, next) {
    PostModel.findByIdAndRemove({_id: req.params.id}).exec()
    // .then(posts => res.render(posts))
    .then(res.redirect('/posts'))
    .catch(err => next(err))
  }

};
