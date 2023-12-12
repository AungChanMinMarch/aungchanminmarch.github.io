function analysisAnchor(theorem_number, article_type, isExercise) {
    const [ch, no] = theorem_number.toString().split(".");
    const chapter = (ch.length == 1) ? "0"+ ch : ch;
    const number = (no.length == 1) ? "0"+ no : no;

    const type = article_type ?? 'Theorem';
    const folder = isExercise ? isExercise : 'theorems'
    const href = `/analysis/ch${chapter}/${folder}/${ch}-${number}.html`;
    return `<a href='${href}'>${type} ${theorem_number}</a>`
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