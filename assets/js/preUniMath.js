import fetchData from "../firestore/fetchData";
import appendToDOM from "./appendQuestionsToDOM.js";

document.addEventListener("DOMContentLoaded", async () => {
	const questions = await fetchData();
	appendToDOM(questions);
});
