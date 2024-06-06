import cytoscape from "cytoscape"
window.cytoscapes.forEach(cytoscapeObj =>{
	var cy = cytoscape(cytoscapeObj)
})
const DEFAULT = {
	style: [
	        {
	          selector: 'node',
	          style: {
	            'background-color': 'var(--my-theme-color)',
	            'label': 'data(label)'
	          }
	        },
	        {
	          selector: 'edge',
	          style: {
	            'width': 3,
	            'line-color': '#ff0000'
	          }
	        }
	    ],

      layout: {
        name: 'grid',
        rows: 1
      }
}

 window.addEventListener('DOMContentLoaded', () => {
      window.graphs.forEach(graph => {
        console.log("I am running");
        const vertices = graph.vertices.map((vertice, index) => ({ data: { id: `vertice-${index}`, label: vertice } }));
        const edges = graph.edges.map((edge, index) => ({
          data: {
            source: vertices[edge[0] - 1].data.id,
            target: vertices[edge[1] - 1].data.id
          },
          // Assign a class to the edge for styling
          classes: edge[0] === edge[1] ? 'self-loop' : 'multiedge'
        }));
        console.log(vertices);
        console.log(edges);
        cytoscape({
          container: document.getElementById(graph.container_id),
          elements: [...vertices, ...edges],
          style: [
            {
              selector: 'node',
              style: {
                'background-color': 'var(--my-theme-color)',
                'label': 'data(label)',
                'text-valign': 'center',
                'color': '#fff',
                'font-size': '16px',
              }
            },
            {
              selector: 'edge',
              style: {
                'width': 3,
                'line-color': '#ff0000',
                'curve-style': 'bezier'
              }
            },
            {
              selector: '.multiedge',
              style: {
                'curve-style': 'bezier',
                'control-point-distance': 40,
                'control-point-weight': 0.5
              }
            },
            {
              selector: '.self-loop',
              style: {
                'curve-style': 'bezier',
                'control-point-distance': 40,
                'control-point-weight': 0.5,
                'loop-direction': '0deg'
              }
            }
          ],
          layout: {
            name: 'grid',
            rows: 1
          }
        });
      });
    });