const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController')
const images = require('../helpers/images')

/* GET home page. */
router.get("/", function(req, res) {
	res.send("Welcome to home!");
});
router.post('/signup', userController.registerUser)
router.post('/login', userController.login)
router.post('/upload',
  images.multer.single('image'),
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })


module.exports = router;
