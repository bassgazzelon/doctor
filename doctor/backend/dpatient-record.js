const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	host: '172.16.0.71',
	user: 'group3',
	password: 'Pa$$w0rd',
	database: 'clinic_app',
});

router.get("/dpatient-record", async (req, res) => {
	const ohipNumber = req.query.ohip;

	const connection = await pool.getConnection();

	try {
		const [patientResults] = await connection.execute("SELECT * FROM Patients WHERE OHIP = ?", [ohipNumber]);

		if (patientResults.length > 0) {
			const [doctorResults] = await connection.execute("SELECT * FROM DoctorTable WHERE OHIP = ?", [ohipNumber]);

			const combinedResults = {
				patient: patientResults[0],
				doctor: doctorResults[0],
			};
			
			res.status(200).json(combinedResults);

		} else {
			res.status(404).json({ error: "Patient not found" });
		}
	} catch (error) {
		console.error("An error occurred while fetching patient record:", error);
		res.status(500).json({ error: "An error occurred while fetching patient record." });
	} finally {
		connection.release();
	}
});

module.exports = router;

