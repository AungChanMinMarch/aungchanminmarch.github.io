function createSecrchFn(data) {

}

export function buildNav(fileName) {
    const parts = fileName.split("/");
    if(parts[0] !== 'analysis'){
        return alert("wrong build nav");
    }
    fetch('analysis/index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const nav = document.getElementById("nav");

            const analysis = document.createElement("a");
            data.forEach(function(folder){

            })
            let title = "index.html"
            if(parts.length === 1){
                bildToc(data)
            }
            for(let title in titles){
                
            }
            // if(parts.length === 3){
            //     const sectionName = parts[2];
            // }
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}