const database = require('../models');
const bcrypt = require('bcrypt');
const service = require('../services/TagGenerator');

class UserController {

	static async create(req, res) {
		try {
			const userForm = req.body;

			if (userForm == null) return res.status(422).json({ message: 'Data not found' });
			if (userForm.password == null) return res.status(422).json({ message: 'Password is required' });

			const selectUser = await database.User.findOne({ where: { email: userForm.email } });
			if (selectUser) return res.status(409).json({ message: 'Email has been registered' });

			userForm.password = bcrypt.hashSync(userForm.password, 10);

			const user = await database.User.create(userForm);

			const userDTO = {
				id: user.id,
				completeName: user.completeName,
				email: user.email,
				isProfessional: user.isProfessional
			}

			if (user.isProfessional) {
				const professionalTag = service.createTag(user.id, user.completeName)
				await database.Professional.create({
					user_id: user.id,
					tag: professionalTag,
					createdAt: new Date(),
					updatedAt: new Date()
				});
				userDTO.tag = professionalTag;
			} else {
				const professionalTag = userForm?.professionalTag || null;
				await database.Patient.create({
					user_id: user.id,
					professionalTag: professionalTag,
					createdAt: new Date(),
					updatedAt: new Date()
				});
				userDTO.professionalTag = professionalTag;
			}
			return res.status(201).json(userDTO);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	static async update(req, res) {
		try {
			const userId = req.userId;

			if (userId.error) return res.status(401).json({ message: userId.error });

			const userForm = req.body;
			if (userForm == null) return res.status(422).json({ message: 'Data not found' });

			const user = await database.User.findByPk(userId);
			if (user == null) return res.status(404).json({ message: 'User not found' });

			// if (userForm.password) delete userForm.password;
			if (userForm.password) userForm.password = bcrypt.hashSync(userForm.password, 10);

			await database.User.update(userForm, {
				where: {
					id: Number(userId)
				}
			})

			if (!user.isProfessional && userForm?.professionalTag) await database.Patient.update(userForm, {
				where: {
					user_id: userId
				}
			})

			return res.status(200).json({ message: `User with ID ${userId} updated` });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	static async read(req, res) {
		try {
			const userId = req.userId;
			let tag = null;

			if (userId.error) return res.status(401).json({ message: userId.error });

			const user = await database.User.findByPk(userId, { exclude: ['password'] });

			if (user == null) return res.status(404).json({ message: 'User not found' });

			const responseData = {
				id: user.id,
				completeName: user.completeName,
				email: user.email,
				isProfessional: user.isProfessional
			}

			if (user.isProfessional) {
				const professional = await database.Professional.findOne({ where: { user_id: user.id } });
				tag = professional?.tag;
				responseData.tag = tag;
			} else {
				const patient = await database.Patient.findOne({ where: { user_id: user.id } });
				tag = patient?.professionalTag;
				responseData.professionalTag = tag;
			}

			return res.status(200).json(responseData);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

}

module.exports = UserController;