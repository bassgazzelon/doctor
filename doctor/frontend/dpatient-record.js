document.addEventListener("DOMContentLoaded", async () => {
	const patientDetails = document.getElementById("patientDetails");

	const urlParams = new URLSearchParams(window.location.search);
	const ohipNumber = urlParams.get("ohip");

	try {
		const response = await fetch(`http://172.16.0.99:3000/api9/dpatient-record?ohip=${ohipNumber}`);
		if (response.ok) {
			const data = await response.json();
		
			displayPatientDetails(patientDetails, data);

			editButton.addEventListener("click", () => {
				window.location.href = `edit-patient.html?ohip=${ohipNumber}`;
			});	
		} else {
			patientDetails.textContent = "Error fetching patient record.";
		}
	} catch (error) {
		console.error("An error occurred while fetching patient record:", error);
		patientDetails.textContent = "An error occurred while fetching patient record.";
	}
});

function displayPatientDetails(container, data) {
	if (data.patient && data.doctor) {
		const patientDetailsHTML = `
			<div class="patient-details">
				<p><strong>Name:</strong> ${data.patient.FirstName} ${data.patient.LastName}</p>
				<p><strong>Gender:</strong> ${data.patient.Gender}</p>
				<p><strong>Date of Birth:</strong> ${new Date(data.patient.DateOfBirth).toLocaleDateString()}</p>
				<p><strong>Contact Number:</strong> ${data.patient.ContactNumber}</p>
				<p><strong>Emergency Contact:</strong> ${data.patient.EmergencyContactName} - ${data.patient.EmergencyContactNumber}</p>
				<p><strong>Weight:</strong> ${data.patient.Weight} kg</p>
				<p><strong>Height:</strong> ${data.patient.Height} cm</p>
				<p><strong>Blood Type:</strong> ${data.patient.BloodType}</p>
				<p><strong>Allergies:</strong> ${data.patient.Allergies}</p>
				<p><strong>Medical History:</strong> ${data.patient.MedicalHistory}</p>
				<p><strong>Current Symptoms:</strong> ${data.patient.CurrentSymptoms}</p>
				<p><strong>Last Updated:</strong> ${new Date(data.patient.LastUpdated).toLocaleString()}</p>


				<p><strong>Full Medical History:</strong> ${data.doctor.FullMedicalHistory}</p>
				<p><strong>Diagnostic Tests:</strong> ${data.doctor.DiagnosticTests}</p>
				<p><strong>Procedures:</strong> ${data.doctor.Procedures}</p>
				<p><strong>Medication History:</strong> ${data.doctor.MedicationHistory}</p>
				<p><strong>Allergies and Reactions:</strong> ${data.doctor.AllergiesAndReactions}</p>
			        <p><strong>Family Medical History:</strong> ${data.doctor.FamilyMedicalHistory}</p>
			        <p><strong>Treatment Plans:</strong> ${data.doctor.TreatmentPlans}</p>
			        <p><strong>Consultation Notes:</strong> ${data.doctor.ConsultationNotes}</p>

			</div>
		`;
		container.innerHTML = patientDetailsHTML;
	} else {
		container.textContent = "Patient or doctor data not found.";
	}
}

