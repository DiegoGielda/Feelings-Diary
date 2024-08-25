const database = require('../models');
const analyzerService = require('../services/SentimentalAnalysis');

class NotesController {

	static async storageNote(req, res) {
		try {
			const dataForm = req.body;
			const userId = req.userId;
			const patient = await database.Patient.findOne({
				where: {
					user_id: userId
				}
			});
			let note;
			if (!dataForm.note_id || dataForm.note_id == null) {
				const sentiments = await analyzerService.verifySentiment(dataForm.description);
				const noteForm = await {
					...dataForm,
					...sentiments,
					patient_id: patient.id
				};
				note = await database.Note.create(noteForm);
			} else {
				note = await database.Note.findOne({
					where: {
						id: dataForm.note_id,
						patient_id: patient.id
					}
				});
			}

			// const responseData = { note: note }

			return res.status(201).send(note);

		} catch (error) {
			return res.status(500).send({ message: error.message });
		}
	}

	static async readAll(req, res) {
		try {
			const userId = req.userId;
			const patient = await database.Patient.findOne({
				where: {
					user_id: userId
				}
			});
			const notes = await database.Note.findAll({
				attributes: ['id', 'description', 'title', 'date', 'positive', 'negative', 'neutral', 'sentiment'],
				where: { patient_id: patient.id },
				order: [['date', 'DESC']]
			});

			let allNotes = [];

			notes.forEach(note => {
				let noteData = {};

				noteData.id = note.id;
				noteData.description = note.description;
				noteData.title = note.title;
				noteData.date = note.date;
				noteData.positive = note.positive;
				noteData.negative = note.negative;
				noteData.neutral = note.neutral;
				noteData.sentiment = note.sentiment;

				allNotes.push(noteData);
			});

			return res.status(200).send(allNotes);
		} catch (error) {
			return res.status(500).send({ message: error.message })
		}
	}

	static async readNote(req, res) {
		try {
			const { id } = req.params;

			const note = await database.Note.findOne({
				attributes: ['id', 'description', 'title', 'date', 'positive', 'negative', 'neutral', 'sentiment'],
				where: { id: id }
			});

			const responseData = {
				note_id: note.id,
				note_description: note.description,
				note_title: note.title,
				note_date: note.date,
				note_positive: note.positive,
				note_negative: note.negative,
				note_neutral: note.neutral,
				note_sentiment: note.sentiment,
			}

			return res.status(200).send(responseData);
		} catch (error) {
			return res.status(500).send({ message: error.message })
		}
	}

	static async update(req, res) {
		try {
			const { id } = req.params;

			if (id.error) return res.status(401).json({ message: id.error });

			const noteForm = req.body;
			if (noteForm == null) return res.status(422).json({ message: 'Data not found' });

			const note = await database.Note.findOne({
				attributes: ['id', 'description', 'title'],
				where: { id: id }
			});
			if (note == null) return res.status(404).json({ message: 'Note not found' });

			await database.Note.update(noteForm, {
				where: {
					id: Number(id)
				}
			})

			return res.status(200).json({ message: `Note with ID ${id} updated` });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	static async readNotesByPatient(req, res) {
		try {
			const { id } = req.params;
			const notes = await database.Note.findAll({
				attributes: ['id', 'title', 'date', 'positive', 'negative', 'neutral', 'sentiment'],
				where: { patient_id: id },
				order: [['date', 'DESC']]
			});

			let allNotes = [];

			notes.forEach(note => {
				let noteData = {};

				noteData.id = note.id;
				noteData.title = note.title;
				noteData.date = note.date;
				noteData.positive = note.positive;
				noteData.negative = note.negative;
				noteData.neutral = note.neutral;
				noteData.sentiment = note.sentiment;

				allNotes.push(noteData);
			});

			return res.status(200).send(allNotes);
		} catch (error) {
			return res.status(500).send({ message: error.message })
		}
	}

}

module.exports = NotesController;