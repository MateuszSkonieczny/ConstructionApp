const express = require('express');
const router = express.Router();

const estateApiController = require('../../api/EstateApi');

router.get('/', estateApiController.getEstates);
router.get('/:estateId', estateApiController.getEstateById);
router.post('/', estateApiController.createEstate);
router.put('/:estateId', estateApiController.updateEstate);
router.delete('/:estateId', estateApiController.deleteEstate);

module.exports = router;