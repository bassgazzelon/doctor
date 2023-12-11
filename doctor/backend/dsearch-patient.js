const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	host: '172.16.0.71',
	user: 'group3',
	password: 'Pa$$w0rd',
	database: 'clinic_app',
});

router.post('/dsearch-patient', async (req, res) => {
	const { searchType, searchValue } = req.body;

	const connection = await pool.getConnection();

	try {
		let results;

		if (searchType === 'byOHIP') {
			[results] = await connection.execute('SELECT * FROM Patients WHERE OHIP = ?', [searchValue]);
		} else if (searchType === 'byNameAndBirthday') {
			const { firstName, lastName, birthday } = searchValue;
			[results] = await connection.execute('SELECT * FROM Patients WHERE FirstName = ? AND LastName = ? AND DateOfBirth = ?', [firstName, lastName, birthday]);
		}

		console.log('Query results:', results);

		res.status(200).json(results);
	} catch (error) {
		console.error('An error occurred during the search:', error);
		res.status(500).json({ error: 'An error occurred during the search.' });
	} finally {
		connection.release();
	}
});

module.exports = router;

