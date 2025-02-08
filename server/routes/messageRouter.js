const express = require('express');
const { SendMessage, getAllMessagesBetweenTwoUser } = require('../controllers/messageController');

const router = express.Router();

router.post('/send/:id', SendMessage);

router.get('/getMessage/:id', getAllMessagesBetweenTwoUser);

module.exports = router;