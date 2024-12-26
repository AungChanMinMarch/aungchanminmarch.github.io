window.MathJax = {
  loader: { load: ["[tex]/newcommand"] },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    processEscapes: true,
    packages: {'[+]': ['amsfonts', 'unicode', 'euler', 'calligra']}
  },
  svg: {
    fontCache: "global",
  },
};
function loadMathJax() {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/mathjax@3.2.0/es5/tex-chtml.js";
  script.async = true;
  script.onload = function(){
    MathJax.startup.getComponents();
    MathJax.startup.promise.then(()=>{
      console.log("MathJax is rendered");
      let delay = 0.3;
      document.querySelector('.progress-bar').style.animation = `loaded ${delay}s linear forwards`;
      window.setTimeout(()=>{
        console.log("stop");
        document.getElementById("loader").style.display = "none";
      }, delay * 2000);
    })
  }
  document.head.appendChild(script);
}
window.onload = function () {
  // const queryString = window.location.search;
  // const searchParams = new URLSearchParams(queryString);
  // if (searchParams.get("download")) {
  //   document.getElementById("style").href = "/assets/pdf.css";
  //   Array.from(document.body.children).forEach(function (child) {
  //     if (
  //       child.tagName === "MAIN" ||
  //       child.tagName === "SCRIPT" ||
  //       child.tagName === "DIV"
  //     )
  //       return;
  //     child.remove();
  //   });
  // } else {
	const scale = document.documentElement.offsetWidth / 780;
	const main = document.querySelector('main');

	// Set explicit width for scaling
	main.style.width = "780px";
	main.style.transform = `scale(${scale})`;
	main.style.transformOrigin = "top left"; // Ensure scaling starts from the top-left corner

	// Adjust layout to prevent overlap
	main.style.position = "relative";
	main.style.marginTop = document.querySelector('header')?.offsetHeight + "px" || "0px";
	main.height = "calc(100% * ${scale})";

	// }
	loadMathJax();
};
