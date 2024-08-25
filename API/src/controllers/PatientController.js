const database = require('../models');

class PatientController {

	static async readAll(req, res) {
		try {
			const userId = req.userId;

			if (userId.error) return res.status(401).json({ message: userId.error });

			const user = await database.User.findByPk(userId, { exclude: ['password'] });

			if (user == null) return res.status(404).json({ message: 'User not found' });

			const professional = await database.Professional.findOne({ where: { user_id: user.id } });
			const professionalTag = professional?.tag;

			const patients = await database.Patient.findAll({
				include: {
					model: database.User,
					attributes: ['id', 'completeName'],
				},
				attributes: ['id', 'professionalTag'],
				where: { professionalTag: professionalTag },
				// order: [['completeName', 'DESC']] //TODO Descobrir como ordenar por nome, sendo que o nome é da tabela de usuário e não de paciente
			});

			let allPatients = [];

			patients.forEach(patientItem => {
				let patientData = {};

				patientData.patientId = patientItem.id;
				patientData.professionalTag = patientItem.professionalTag;
				patientData.completeName = patientItem.User.completeName;

				allPatients.push(patientData);
			});

			return res.status(200).json(allPatients);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

}

module.exports = PatientController;