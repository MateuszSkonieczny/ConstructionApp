const express = require('express');
const router = express.Router();

const estateController = require('../controllers/estateController');
const authUtils = require("../util/authUtils");

router.get('/', estateController.showEstateList);
router.get('/add', authUtils.permitAuthenticatedUser, estateController.showAddEstateForm);
router.get('/edit/:estateId', authUtils.permitAuthenticatedAdmin, estateController.showEditEstateForm);
router.get('/details/:estateId', estateController.showEstateDetails);
router.post('/add', authUtils.permitAuthenticatedUser, estateController.addEstate);
router.post('/edit', authUtils.permitAuthenticatedAdmin, estateController.updateEstate);
router.get('/delete/:estateId',  authUtils.permitAuthenticatedAdmin, estateController.deleteEstate);

module.exports = router;