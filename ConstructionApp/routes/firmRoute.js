const express = require('express');
const router = express.Router();

const firmController = require('../controllers/firmController');
const authUtils = require("../util/authUtils");

router.get('/', firmController.showFirmList);
router.get('/add', firmController.showAddFirmForm);
router.get('/edit/:firmId', authUtils.permitAuthenticatedUserFirm, firmController.showEditFirmForm);
router.get('/edit/password/:firmId', authUtils.permitAuthenticatedUserFirm, firmController.showEditFirmPasswordForm);
router.get('/details/:firmId', authUtils.permitAdmin, firmController.showFirmDetails);
router.post('/add', firmController.addFirm);
router.post('/edit', authUtils.permitAuthenticatedUserFirm, firmController.updateFirm);
router.post('/edit/password', authUtils.permitAuthenticatedUserFirm, firmController.updateFirmPassword);
router.get('/delete/:firmId', authUtils.permitAuthenticatedAdmin, firmController.deleteFirm);

module.exports = router;