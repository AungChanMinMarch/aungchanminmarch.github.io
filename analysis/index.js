function secrchSection(sectionName) {
    // body...
}
export function buildNav(fileName) {
    const parts = fileName.split("/");
    const jsonUrl = `${parts[0]}/${parts[1]}/index.json`
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const nav = document.getElementById("nav");
            const files = data.files;
            const titles = data.titles;
            for(let title in titles){
                console.log(title)
            }
            // if(parts.length === 3){
            //     const sectionName = parts[2];
            // }
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}