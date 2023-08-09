window.anchor = function (el) {
	const [ch, no] = el.innerHTML.split(".");
	const chapter = (ch.length == 1) ? "0"+ ch : ch;
	const number = (no.length == 1) ? "0"+ no : no;
	
	el.href = `404?file=/analysis/ch${chapter}/theorems/theorem-${ch}-${number}`;
	el.innerHTML = `Theorem ${el.innerHTML}`
}