const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authUtils = require("../util/authUtils");

router.get('/edit/password', authUtils.permitAuthenticatedAdmin, adminController.showEditAdminPasswordForm);
router.post('/edit/password', authUtils.permitAuthenticatedAdmin, adminController.updateAdminPassword);

module.exports = router;