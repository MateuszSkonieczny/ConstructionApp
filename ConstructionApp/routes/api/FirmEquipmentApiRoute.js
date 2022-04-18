const express = require('express');
const router = express.Router();

const firmEquipmentApiController = require('../../api/FirmEquipmentApi');

router.get('/', firmEquipmentApiController.getFirmEquipments);
router.get('/:firmEquipmentId', firmEquipmentApiController.getFirmEquipmentById);
router.post('/', firmEquipmentApiController.createFirmEquipment);
router.put('/:firmEquipmentId', firmEquipmentApiController.updateFirmEquipment);
router.delete('/:firmEquipmentId', firmEquipmentApiController.deleteFirmEquipment);

module.exports = router;
