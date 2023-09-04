const mongoose = require('mongoose');
const PostSchema = require('./post');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters!'
    },
    required: [true, 'Name is required!']
  },
  followers: Number,
  posts: [PostSchema],
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogpost'
  }]
});

//This is a virtual field not saved on the db but is a calculated item you could do this for total
//amount in a shopping cart
//Rare case when not to return a fat arrow function cause of what this refers to
UserSchema.virtual('postCount').get(function() { 
  return this.posts.length
});

//Adding middleware
UserSchema.pre('deleteOne', { document: true }, function (next) {
  const BlogPost = mongoose.model('blogpost');
  // this === joe

  BlogPost.deleteMany({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;