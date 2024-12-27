function createPaperLinks(paperArr = []) {
  // Create a container for the paper links
  const container = document.createElement("div");
  
  paperArr.forEach(({ paper, no, mark }) => {
    const link = document.createElement("a");
    link.textContent = `${paper} no. ${no} (${mark} marks)`;
    link.href = paper;
    container.appendChild(link);
  });
  
  return container;
}

function toggleTopics(event) {
  const topicBox = event.target.closest(".theorem").querySelector(".topic-box");
  if (topicBox) {
    topicBox.classList.toggle("hidden");
  }
}

function fetchAnswer() {
  alert("I am very busy. Coming soon!!!");
}

function createBar(question, papers) {
  const bar = document.createElement("h3");
  bar.classList.add("bar");

  // Toggle button
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Toggle Content";
  toggleButton.addEventListener("click", toggleTopics);
  
  // Fetch button
  const fetchButton = document.createElement("button");
  fetchButton.textContent = "Fetch Answer";
  fetchButton.addEventListener("click", fetchAnswer);

  // Difficulty span
  const difficulty = document.createElement("span");
  difficulty.textContent = `Difficulty = ${question.difficulty}`;

  // Append elements to the bar
  bar.appendChild(toggleButton);
  bar.appendChild(fetchButton);
  bar.appendChild(difficulty);
  
  // Add paper links
  const paperLinks = createPaperLinks(papers);
  bar.appendChild(paperLinks);

  return bar;
}

function createContentContainer(question) {
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  // Topics section
  const topicsHTML = question.topics
    ?.map(topic => `<a href='/preUniMath/${topic}.html'>${topic}</a>`)
    .join(", ") || "No topics available";
  
  contentContainer.innerHTML = `
    <p class="topic-box hidden">${topicsHTML}</p>
    <div class="answer"></div>
  `;

  return contentContainer;
}

export default function renderQuestions(questions) {
  const questionList = document.getElementById("question-list");
  if (!questionList) return;

  questions.forEach((question) => {
    const questionEl = document.createElement("details");
    questionEl.classList.add("theorem");

    // Question summary
    const summaryEl = document.createElement("summary");
    summaryEl.classList.add("statement");
    summaryEl.innerHTML = question.question;
    questionEl.appendChild(summaryEl);

    // Content body
    const contentBody = document.createElement("div");

    // Bar with buttons and papers
    const bar = createBar(question, question.papers || []);
    contentBody.appendChild(bar);

    // Content container
    const contentContainer = createContentContainer(question);
    contentBody.appendChild(contentContainer);

    questionEl.appendChild(contentBody);
    questionList.appendChild(questionEl);

    // Handle SVG rendering
    const { svgs } = question;
    if (svgs && svgs.length > 0) {
      if (window.renderSVG) {
        svgs.forEach(svg => {
								window.renderSVG(svg)
				});
      } else {
        window.svgs = [...(window.svgs || []), ...svgs];
      }
    }
  });

  // ReRender MathJax if it has been rendered
  if (window.hasMathJaxRendered) {
    MathJax.typesetPromise();
  }
}
