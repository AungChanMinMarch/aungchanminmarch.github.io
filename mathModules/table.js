// <div data-math="table" data-cols="xxx"> cell1 & cell2 // row2 col1 & row2 col2</div>
// Instead of xxx, use c for center, use r for right, use l for left align
const symbols = {
	"c": "center",
	"r": "right",
	"l": "left"
}
window.table = function (el) {
	const str = el.innerHTML;
	el.innerHTML = "";
	const cols = el.dataset.cols;
	el.classList.add("center-box")
	const table = document.createElement("div");
	table.classList.add("table");
	el.appendChild(table)
	str.split("\\\\").forEach(function(tr){
		console.log(tr)
		const trEl = document.createElement("div");
		trEl.classList.add("tr")
		table.appendChild(trEl);
		// if i use split("&"), there is $amp;$ in non-first tds
		tr.split("&amp;").forEach(function(td, index){
			const tdEl = document.createElement("div");
			trEl.appendChild(tdEl);
			tdEl.classList.add(symbols[cols[index]]);
			tdEl.innerHTML = `$${td}$`;
		})
	})
}