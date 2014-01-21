function Setup(container, figureNo) {
	
	var ratio = 1;
	var initHeight;
	var initWidth;
	
	this.setStageDimensions = setStageDimensions;
	this.getGScale = getGScale;
	this.setGScale = setGScale;
	this.getMainLayer = getMainLayer;
	this.getStage = getStage;
	this.setStageHeight = setStageHeight;
	//this.setRatio = setRatio;
	this.setInitHeight = setInitHeight;
	this.setInitWidth = setInitWidth;
	
	var timeout = false;
	
	//var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	//var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

	var width = 880;
	var height = 800;
	
	var stage = new Kinetic.Stage({
			container : container,
			width : width,
			height : height
		});
		
	var mainLayer = new Kinetic.Layer();

	var bg = new Kinetic.Rect({
			x : 0,
			y : 0,
			width : stage.getWidth(),
			height : stage.getHeight()
		});

	var thisObj = this;
	
	stage.add(mainLayer);
	mainLayer.add(bg);
	
	var gScale = 1;
	
	var truthTable = new TruthTable(container);
	var controller = new Controller(this, truthTable);

	var figure = new Figures(this, controller, truthTable);
	figure.setFigure(this, controller, figureNo, width, height, null);
	
	setStageDimensions(initWidth, initHeight);
	
	console.log(width + ", " + height);
	
	$(window).resize( function() {
		if (timeout == false) {
			timeout = true;
			setTimeout(resize, 200);
		}
	});
	
	function setStageDimensions(width, height) {
		stage.setWidth(gScale * width);
		stage.setHeight(gScale * height);
		stage.draw();
	}
	
	function setStageHeight(height) { stage.setHeight(gScale * height); stage.draw(); }
	
	function getStageWidth() { return stage.getWidth(); }
	
	function getGScale() { return gScale; }
	
	function setGScale(num) { gScale = num; controller.refreshScale(); console.log("Setting new scale: " + num); }
	
	function getMainLayer() { return mainLayer; }
	
	function getStage() { return stage; }
	
	resize();
	ratio = 1;
	
	function resize() {
		//width = window.innerWidth;
		//height = window.innerHeight;
		//width = document.getElementById("wrapper").offsetWidth;
		//console.log(container + ": resized..");
		
		width = window.innerWidth;
		//if (width > 880) width = 880;
		
		//if (width * ratio > initHeight) height = initHeight;
		//else height = width * ratio;
		if (width / 880 <= 1) { ratio = width / initWidth; width = ratio * width; height = ratio * height; }
		else ratio = 1;
		height = stage.getHeight() * ratio;
		
		console.log("Ratio: " + ratio);
		
		
		//height = 450;
		
		console.log("Height: " + height);
		//stage = new Kinetic.Stage({container: container, width: width, height: height });
		//mainLayer = new Kinetic.Layer({x: 0, y: 0, width: width, height: height });
		//bg = new Kinetic.Rect({x: 0, y: 0, width: width, height: height });
		//stage.add(mainLayer);
		//mainLayer.add(bg);
		//inputVals = controller.getInputValues();
		//controller = new Controller(thisObj, truthTable);
		//figure.setFigure(thisObj, controller, figureNo, width, height, inputVals);
		stage.setScale(ratio);
		stage.setSize(width, height);
		//document.getElementById(container).setAttribute("style","height:" + height + "px");
		timeout = false;
		console.log("Stage height: " + stage.getHeight());
	}
	
	function setRatio(height, width) { ratio = height / width; }
	
	function setInitWidth(width) { initWidth = width; }
	
	function setInitHeight(height) { initHeight = height; }
	
	function setInitWidth(width) { initWidth = width; }
}
