function analysisAnchor(theorem_number) {
    const [ch, no] = theorem_number.toString().split(".");
    const chapter = (ch.length == 1) ? "0"+ ch : ch;
    const number = (no.length == 1) ? "0"+ no : no;

    const href = `/analysis/ch${chapter}/theorems/theorem-${ch}-${number}`;
    return `<a href='${href}'>Theorem ${theorem_number}</a>`
}

module.exports = function(...args){
    const parts = this.page.inputPath.split("/");
    if(parts[1] !== 'src'){
        console.log(`Error : page.inputPath in anchor component has to start with './src/' but got '${parts[0]}/${parts[1]}/'`)
        return `<a href='/404' class='error'>ERROR</a>`
    }
    if(parts[2] === 'analysis'){
        return analysisAnchor(...args);
    }
}