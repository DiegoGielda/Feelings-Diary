const { Router } = require('express');
const NotesController = require('../controllers/NotesController');

const router = Router();

router.post('/notes', NotesController.storageNote);

router.put('/notes/:id', NotesController.update);

router.get('/notes', NotesController.readAll);

router.get('/notes/:id', NotesController.readNote);

router.get('/patient/:id/notes', NotesController.readNotesByPatient);

module.exports = router;