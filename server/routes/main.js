const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')

/**
 * Main route
 */

router.get('' , mainController.homepage);
router.get('/about' , mainController.aboutpage);
router.get('/add' , mainController.addUsers );
router.post('/add' , mainController.addUsersData);
router.get('/view/:id' , mainController.viewUserData);
router.get('/edit/:id' , mainController.editUserPage);
router.put('/edit/:id' , mainController.editUserData);
router.delete('/edit/:id' , mainController.deleteUserData);
router.post('/search' , mainController.searchUser);

module.exports = router;