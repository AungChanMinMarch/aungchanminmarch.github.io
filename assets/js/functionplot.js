import functionPlot from 'function-plot';

const DEFAULT = {
	color: "black"
}

function customFunctionPlot(options) {
    options.data.forEach(function(item) {
        if (!item.hasOwnProperty('color')) {
            item.color = DEFAULT.color;
        }
    });

    functionPlot(options);
}
window.addEventListener("load", function(){
	if(!window.plots) return;
	window.plots.forEach(plot =>{
		customFunctionPlot(plot)
	})
})
