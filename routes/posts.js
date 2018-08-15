var express = require("express");
var router = express.Router();
const postsController = require('../controllers/postsController')

/* GET posts listing. */
router.get('/', postsController.getPosts);
router.get('/:id', postsController.getOnePost);
router.get('/:userId', postsController.getPostByUploader);
router.post('/', postsController.addPost);
router.delete('/:id', postsController.deletePost);
router.put('/:id', postsController.updatePost);

module.exports = router;
