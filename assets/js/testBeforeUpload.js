import uploadData from "../firestore/upload";
import appendToDOM from "./appendQuestionsToDOM.js";

async function fetchDataFromSource() {
	const pathname = window.location.pathname;

	if (pathname === "/test.html") {
		await fetchTestData();
		return window.questions;
	} else {
    alert("wrong script file! test.js should be in /test.html");
  }
}

async function fetchTestData() {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = "/questions.js";
		script.async = true;

		script.onload = () => {
			window.questions = questions; // Assign global variable
			resolve();
		};
		script.onerror = () => reject(new Error(`Failed to load script: ${script.src}`));

		document.head.appendChild(script);
	});
}


document.addEventListener("DOMContentLoaded", async () => {
	const questions = await fetchDataFromSource();
	appendToDOM(questions);

});
const uploadButton = document.getElementById("uploadBtn");
uploadButton?.addEventListener("click", () => {
	uploadData(window.questions)
		.then(() => {
			alert("All questions uploaded successfully.");
			console.log(uploadData)
		})
		.catch(error => {
			alert("Error uploading questions:", error);
		});
});
