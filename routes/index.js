const express = require('express');
const router = express.Router()
const indexController = require('../controllers/indexController');
const chatController = require('../controllers/chatController');


router.get('/index',indexController.getIndex);

router.get('/createRoom', indexController.createRoom)
router.get('/joinRoom',indexController.getjoinRoom);
router.post('/joinRoom', indexController.postjoinRoom);
router.get('/session/:sessionId',chatController.getChatRoom);

module.exports = router;