import fetchData from "../firestore/fetchData";

document.addEventListener("DOMContentLoaded", async () => {
  const questions = await fetchData();
  const questionList = document.getElementById("question-list");
	console.log(questions);


  questions.forEach(question => {
    const questionEl = document.createElement("li");
	  questionEl.classList.add('theorem');
	  const qEl = document.createElement('div');
	  qEl.classList.add('statement');
    qEl.innerHTML = question.question;
	questionEl.appendChild(qEl);
    questionList.appendChild(questionEl);
  });
});

