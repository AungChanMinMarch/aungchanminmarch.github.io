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
    log(fileName.endsWith("/"))
    fetchHTML(fileName, root).then(function(res){
        loadMathModules();
        loadMathJax();
    }).catch(function(err){
        root.innerHTML = `<h1>Sorry Something went wrong</h1><p> message ${err}</p>`
    })
};

async function fetchHTML(fileName, parentDiv) {
    if (fileName.endsWith("/")) fileName += "index.html";
    else if(!fileName.endsWith(".html")) fileName += ".html";
    return new Promise((resolve, reject) => {
        fetch(fileName)
            .then(function(response) {
                if (!response.ok) {
                    if (response.status === 404) {
                        if (fileName.endsWith("index.html")) {
                            throw new Error('Data not found');
                            return;
                        }
                        fetchHTML(fileName.replace(".html", "/"), parentDiv);
                    } else {
                        throw new Error('Network response was not ok');
                    }

                }
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
            })
            .catch((err)=>{
                log(err);
                reject(err);
            });
    });
}