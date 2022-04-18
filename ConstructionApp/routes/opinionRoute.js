const express = require('express');
const router = express.Router();

const opinionController = require('../controllers/opinionController');
router.get('/:firmId', opinionController.showOpinions);
router.post('/:firmId', opinionController.addOpinion);

module.exports = router;
