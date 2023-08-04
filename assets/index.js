const log = console.log;
window.MathJax = {
    loader: {load: ['[tex]/newcommand']},
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  svg: {
    fontCache: 'global'
  }
};

function loadMathJax() {
  var script = document.createElement('script');
  script.src = '/mathjax/es5/tex-chtml-full.js';
  script.async = true;
  document.head.appendChild(script);
};
const mathModuleAttrName = "data-math"
function loadMathModules(){
    Array.from(document.querySelectorAll(`[${mathModuleAttrName}]`)).forEach(function(el){
        const mathModuleAttrValue = el.getAttribute(mathModuleAttrName);
        const mathModuleName = mathModuleAttrValue.replace("/", "_");
        console.log(mathModuleName)
        window[mathModuleName](el);
    })
}

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const fileName = params.get("file") ?? "/home.html";
    const root = document.getElementById("root");
    fetchHTML(fileName, root).then(function(res){
        loadMathModules();
        loadMathJax();
    })
};

async function fetchHTML(fileName, parentDiv) {
    return new Promise((resolve, reject) => {
        fetch(fileName).then(function(response) {
            response.text().then(function(htmlStr) {
                const container = document.createElement("div");
                container.innerHTML = htmlStr;
                parentDiv.appendChild(container);
                const fetchPromises = Array.from(container.querySelectorAll("[data-input]")).map(function(el) {
                    const file = el.getAttribute("data-input");
                    return fetchHTML(file, el);
                });
                Promise.all(fetchPromises).then(() => {
                    resolve(); // Resolve the main promise when all fetches are complete
                });
            });
        }).catch(function(err) {
            reject(err);
            log(err);
        });
    });
}