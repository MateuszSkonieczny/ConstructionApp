const express = require('express');
const router = express.Router();

const constructionController = require('../controllers/constructionController');
const authUtils = require("../util/authUtils");

router.get('/', authUtils.permitAuthenticatedUser, constructionController.showConstructionList);
router.get('/add', authUtils.permitAuthenticatedUser, constructionController.showAddConstructionForm);
router.get('/edit/:constructionId', authUtils.permitAuthenticatedUserConstruction, constructionController.showEditConstructionForm);//nowe
router.get('/details/:constructionId', authUtils.permitAuthenticatedUserConstruction, constructionController.showConstructionDetails);//nowe
router.post('/add', constructionController.addConstruction);
router.post('/edit', constructionController.updateConstruction);
router.get('/delete/:constructionId', authUtils.permitAuthenticatedUserConstruction, constructionController.deleteConstruction);//nowe

module.exports = router;