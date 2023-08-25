window.konva = function(){
	var stage = new Konva.Stage({
            container: 'container',
            width: 500,
            height: 500,
        });

        var layer = new Konva.Layer();
        stage.add(layer);
        const centerX = stage.width() / 2;
        const centerY = stage.height() / 2;
        const outerRadius = 100;
        const innerRadius = 75;

        // Draw the outer circle
        var outerCircle = new Konva.Circle({
            x: centerX,
            y: centerY,
            radius: outerRadius,
            stroke: 'black',
            strokeWidth: 2,
        });

        layer.add(outerCircle);

        // Draw the inner circle
        var innerCircle = new Konva.Circle({
            x: centerX,
            y: centerY,
            radius: innerRadius,
            stroke: 'black',
            strokeWidth: 2,
        });

        layer.add(innerCircle);

        // Fill the area between the two circles
        var filledArea1 =  new Konva.Arc({
	        x: stage.width() / 2,
	        y: stage.height() / 2,
	        innerRadius: innerRadius,
	        outerRadius: outerRadius,
	        fillPatternX: 10,
	        rotation: 120,
	        angle: 90,
	        fill: '#555'
	    });
        layer.add(filledArea1);

        // Fill the area between the two circles
        var filledArea2 =  new Konva.Arc({
	        x: stage.width() / 2,
	        y: stage.height() / 2,
	        innerRadius: innerRadius,
	        outerRadius: outerRadius,
	        rotation: 30,
	        angle: 90,
	        fill: '#222'
	    });
        layer.add(filledArea2);
        layer.draw();
}