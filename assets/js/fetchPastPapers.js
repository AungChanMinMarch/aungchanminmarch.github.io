import fetchData from "../firestore/fetchData";
import uploadData from "../firestore/upload";

async function fetchDataFromSource() {
  const pathname = window.location.pathname;

  if (pathname === "/test.html") {
    await fetchTestData();
    return window.questions;
  }

  return fetchData(); // Fetch from Firestore
}

async function fetchTestData() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/local/questions.js";
    script.async = true;

    script.onload = () => {
      window.questions = questions; // Assign global variable
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${script.src}`));

    document.head.appendChild(script);
  });
}

function createPapers(paperArr) {
  console.log("fetching from firestore");
  const el = document.createElement("div");
  for (let i = 0; i < paperArr?.length; i++) {
    const paper = paperArr[i].paper;
    const no = paperArr[i].number + 1;
    const a = document.createElement("a");
    a.append(`${paper} no. ${no}, `);
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

document.addEventListener("DOMContentLoaded", async () => {
  const questions = await fetchDataFromSource();
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
