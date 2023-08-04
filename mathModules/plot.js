const defaultWidth = document.body.getBoundingClientRect().width;
const defaultRatio = 16 / 9;
const defaultY = [-1,9];
// const default
window.plot = function(el) {
    // Define the function f(x)
    function f(x) {
        const n = Infinity; // We are approximating n to infinity
        const cosTerm = Math.cos(120 * Math.PI * x);
        console.log(cosTerm);
        console.log(n)
        const fValue = Math.pow(cosTerm, 2 * n);
        return fValue;
    }

    // Generate data for plotting
    const data = [];
    const step = 0.01;
    for (let x = -2; x <= 2; x += step) {
        console.log(f(x))
        data.push({ x: x, y: f(x) });
    }

    // Plot the function using Chart.js
    const canvas = document.createElement("canvas");
    el.appendChild(canvas)
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'f(x) = (cos(5! * π * x))^(2n) as n tends to infinity',
                data: data,
                borderColor: 'blue',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    max: 2
                }
            }
        }
    });

}
// window.plot = function (el) {
//     const width = el.dataset.width ?? defaultWidth;
//     const ratio = el.dataset.ratio ?? defaultRatio;
//     const yAxis = el.dataset.yAxis ?? defaultY;
//     let data = [{
//         x: 'sin(t) * (exp(cos(t)) - 2 cos(4t) - sin(t/12)^5)',
//         y: 'cos(t) * (exp(cos(t)) - 2 cos(4t) - sin(t/12)^5)',
//         range: [-10 * Math.PI, 10 * Math.PI],
//         fnType: 'parametric',
//         graphType: 'polyline'
//     }];
//     let plotConfig = {
//         target: `#${el.id}`,
//         width: width,
//         height: width / ratio,
//         yAxis: yAxis,
//         data: data
//     }
//     console.log(`#${el.id}`)
//     functionPlot(plotConfig)
// }