var express = require("express");
var router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getOneUser);
router.post('/', usersController.registerUser);
router.delete('/:id', usersController.deleteUser);
router.put('/:id', usersController.updateUser);

module.exports = router;
