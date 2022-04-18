const express = require('express');
const router = express.Router();

const firmApiController = require('../../api/FirmApi');

router.get('/', firmApiController.getFirms);
router.get('/:firmId', firmApiController.getFirmById);
router.post('/', firmApiController.createFirm);
router.put('/:firmId', firmApiController.updateFirm);
router.delete('/:firmId', firmApiController.deleteFirm);

module.exports = router;