const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
  imageUrl: {
    type: String,
    required: [true, 'url is required']
  },
  caption: {
    type: String,
    required: [true, 'caption is required']
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'uploader id is required']
  }
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post
