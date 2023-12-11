document.addEventListener("DOMContentLoaded", () => {
	const searchForm = document.getElementById("searchForm");
	const searchResults = document.getElementById("searchResults");

	searchForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		searchResults.innerHTML = "Searching...";

		const formData = new FormData(searchForm);
		const searchValue = formData.get("ohipNumber");

		try {
			const response = await fetch('http://172.16.0.99:3000/api8/dsearch-patient', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ searchType: "byOHIP", searchValue }),
			});
			
			if (response.ok) {
				const data = await response.json();
				console.log("Response data:", data);
				
				if (data && data.length > 0) {
					searchResults.innerHTML = 'Search successful!';
					const ohipNumber = data[0].OHIP;
					console.log("Redirecting to:", `dpatient-record.html?ohipNumber=${ohipNumber}`);
					window.location.href = `dpatient-record.html?ohip=${ohipNumber}`;
				} else {
					searchResults.innerHTML = "Patient not found.";
				}
			} else {
				searchResults.innerHTML = "Search failed.";
			}
		} catch (error) {
			console.error("An error occurred during the search:", error);
			searchResults.innerHTML = "An error occurred during the search.";
		}
	});
});

