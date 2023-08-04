// @param defined_by = ($f_n(x)=nx$ for all $x \in R$)
window.analysis_pointwiseConvergeQ1 = function (el) {
	const defined_by = el.innerHTML;
	el.innerHTML = `Conside the sequence $\\{f_n\\}$ of functions defined by ${defined_by}. Determine $ \\{f_n \\}$ is pointwise convergent.`
}