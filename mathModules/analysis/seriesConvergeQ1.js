// <div data-math=""> series </div>
window.analysis_seriesConvergeQ1 = function (el) {
	const series = el.innerHTML;
	el.innerHTML = `Determine the series $\\sum\\limits_{n=0}^{\\infty}${series}$ converges or diverges. If it converges, determine its sum.`
}