const express = require('express');
const router = express.Router();

const equipmentApiController = require('../../api/EquipmentApi');

router.get('/', equipmentApiController.getEquipments);
router.get('/:equipmentId', equipmentApiController.getEquipmentById);
router.post('/', equipmentApiController.createEquipment);
router.put('/:equipmentId', equipmentApiController.updateEquipment);
router.delete('/:equipmentId', equipmentApiController.deleteEquipment);

module.exports = router;
