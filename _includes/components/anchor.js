function analysisAnchor(theorem_number, displayName, type='th') {
    const [ch, no] = theorem_number.toString().split(".");
    const chapter = (ch.length == 1) ? "0"+ ch : ch;
    const number = (no.length == 1) ? "0"+ no : no;

    let folderPrefix = '';
    let displayNamePrefix = '';
    if (type.indexOf('th') > -1){
      folderPrefix = 'theorems/theorem-';
      displayNamePrefix = displayName || 'Theorem ';
    } else if (type.indexOf('ex') > -1){
      folderPrefix = 'exercises/ex-';
      displayNamePrefix = displayName || 'Exercise ';
    }
    const href = `/analysis/ch${chapter}/${folderPrefix}${ch}-${number}.html`;
    return `<a href='${href}'>${displayNamePrefix}${theorem_number}</a>`
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
