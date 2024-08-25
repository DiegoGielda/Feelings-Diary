const { Router } = require('express');
const PatientController = require('../controllers/PatientController');

const router = Router();

router.get('/patients', PatientController.readAll);

module.exports = router;