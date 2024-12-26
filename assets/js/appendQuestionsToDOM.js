function createPapers(paperArr) {
  console.log("fetching from firestore");
  const el = document.createElement("div");
  for (let i = 0; i < paperArr?.length; i++) {
    const {paper, no, mark} = paperArr[i];
    const a = document.createElement("a");
    a.append(`${paper} no. ${no+1} (${mark} marks) `);
    a.href = paper;
    el.appendChild(a);
  }
  return el;
}

function toggleTopics(e) {
  e.target.closest(".theorem").querySelector(".topic-box").classList.toggle("hidden");
}

function fetchAnswer() {
  alert("I am very busy. Coming soon!!!");
}
export default function(questions){
	const questionList = document.getElementById("question-list");

	questions.forEach((question) => {
		const questionEl = document.createElement("details");
		questionEl.classList.add("theorem");

		const qEl = document.createElement("summary");
		qEl.classList.add("statement");
		qEl.innerHTML = question.question;
		questionEl.appendChild(qEl);

		const contentBody = document.createElement("div");
		questionEl.appendChild(contentBody);

		// Create bar with buttons
		const bar = document.createElement("h3");
		bar.classList.add("bar");

		const toggleButton = document.createElement("button");
		toggleButton.textContent = "Toggle Content";
		toggleButton.addEventListener("click", toggleTopics);

		const fetchButton = document.createElement("button");
		fetchButton.textContent = "Fetch Answer";
		fetchButton.addEventListener("click", fetchAnswer);

		const difficulty = document.createElement("span");
		difficulty.textContent = `Difficulty = ${question.difficulty}`;

		bar.appendChild(toggleButton);
		bar.appendChild(fetchButton);
		bar.appendChild(difficulty);
		bar.appendChild(createPapers(question.papers));

		// Create content container
		const contentContainer = document.createElement("div");
		contentContainer.classList.add("content-container");
		contentContainer.innerHTML = `
      <p class="topic-box hidden">${question.topics?.map(topic => `<a href='/preUniMath/${topic}.html'>${topic}</a>`).join(", ")}</p>
      <div class="answer"></div>
    `;

		contentBody.appendChild(bar);
		contentBody.appendChild(contentContainer);

		questionList.appendChild(questionEl);
	});
	MathJax.typeset();
}
