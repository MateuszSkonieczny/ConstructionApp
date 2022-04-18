const express = require('express');
const router = express.Router();

const constructionApiController = require('../../api/ConstructionApi');

router.get('/', constructionApiController.getConstructions);
router.get('/:constructionId', constructionApiController.getConstructionById);
router.post('/', constructionApiController.createConstruction);
router.put('/:constructionId', constructionApiController.updateConstruction);
router.delete('/:constructionId', constructionApiController.deleteConstruction);

module.exports = router;