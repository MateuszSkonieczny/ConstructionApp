const express = require('express');
const router = express.Router();

const firmEquipmentController = require('../controllers/firmEquipmentController');
const authUtils = require("../util/authUtils");

router.get('/', authUtils.permitAuthenticatedUser, firmEquipmentController.showFirmEquipmentList);
router.get('/add', authUtils.permitAuthenticatedUser, firmEquipmentController.showAddFirmEquipmentForm);
router.get('/edit/:firmEquipmentId', authUtils.permitAuthenticatedUserFirmEquipment, firmEquipmentController.showEditFirmEquipmentForm);
router.get('/details/:firmEquipmentId', authUtils.permitAuthenticatedUserFirmEquipment, firmEquipmentController.showFirmEquipmentDetails);
router.post('/add', authUtils.permitAuthenticatedUser, firmEquipmentController.addFirmEquipment);
router.post('/edit',  authUtils.permitAuthenticatedUser, firmEquipmentController.updateFirmEquipment);
router.get('/delete/:firmEquipmentId', authUtils.permitAuthenticatedUserFirmEquipment, firmEquipmentController.deleteFirmEquipment);

module.exports = router;