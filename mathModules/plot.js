// To specify x-range use data-x-domain(this is also true for y)
// e.g. data-x-domain="[-2,3]" will plot the function between -2 and 3 of x
// e.g. data-y-domain="[-2,3]" will plot the function between -2 and 3 of y

//  to plot grid use data-grid="true"
// to disable zoom use data-disable-zoom = "true"
// data-annotations = "[{x: -1 }, {    x: 1,    text: 'x = 1'  }"

function generateDefaults(){
    const screenWidth = document.body.getBoundingClientRect().width;
    let width = screenWidth;
    if(screenWidth > 825) width = 825;

    const ratio = 16 / 9;
    return {
        width, ratio
    }
}
const defaults = generateDefaults();
let myUinqueIDCount = 0;
window.generateUniqueID = function(){
    const date = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    myUinqueIDCount++;
    return `${date}${random}${random}`;
}
function myEval(strFromHtml){
    let value;
    eval(`value=${strFromHtml}`)
    return value;
}
window.plot = function (el) {
    let config = {...defaults};
    for(const key in el.dataset){
        if(key === "math") continue
        const value = el.dataset[key];
        if(value === undefined) continue;
        if(key === "data"){
            const data = eval(value);
            console.log(data);
            data.forEach(function(fn){
                if(!fn.color){
                    fn.color = "black"
                }
            })
            config.data = data;
            continue
        }
        config[key] = eval(value);
    }
    if(!!config.data){
        const uniqueId = generateUniqueID();
        el.dataset.id = uniqueId;
        el.style.width = `${config.width}px`;
        config.target = `[data-id=${uniqueId}]`;
        console.log(functionPlot.globals.COLORS)
        functionPlot(config);
    }
}