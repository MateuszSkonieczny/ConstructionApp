const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipmentController');
const authUtils = require("../util/authUtils");

router.get('/', equipmentController.showEquipmentList);
router.get('/add', authUtils.permitAuthenticatedUser, equipmentController.showAddEquipmentForm);
router.get('/edit/:equipmentId', authUtils.permitAuthenticatedAdmin, equipmentController.showEditEquipmentForm);
router.get('/details/:equipmentId', equipmentController.showEquipmentDetails);
router.post('/add', authUtils.permitAuthenticatedUser, equipmentController.addEquipment);
router.post('/edit', authUtils.permitAuthenticatedAdmin, equipmentController.updateEquipment);
router.get('/delete/:equipmentId', authUtils.permitAuthenticatedAdmin, equipmentController.deleteEquipment);

module.exports = router;