function TruthTable(container) {
	var suffix = container.substring(container.length - 1);
	var numOut;
	var visible = true;
	var rows;
	var cols;
	
	this.createTable = createTable;
	this.setTable = setTable;
	this.highlightRow = highlightRow;
	this.highlightFirstRow = highlightFirstRow;
	this.getTableWidth = getTableWidth;
	this.setTableOffset = setTableOffset;
	this.showTruthTable = showTruthTable;
	
	function createTable(numInputs, numOutputs, headerVals, flag) {
		if (!flag) {
			rows = Math.pow(2, numInputs); // set number of rows
			cols = numInputs + numOutputs; // set number of columns
		}
		else {
			rows = numInputs;
			cols = numInputs + numOutputs;
		}
		
		numOut = numOutputs;
		var body = document.getElementById(container).childNodes[0]; // grab the div element for the table
		var tbl = document.createElement('table'); // create a table element
		tbl.id = "table" + suffix; // set its ID
		tbl.border = '2'; // set border thickness
		var tbdy = document.createElement('tbody');

		//set up table rows
		for (var i = 0; i < rows; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < cols; j++) {
				var td = document.createElement('td');
				td.appendChild(document.createTextNode('-1'))
				tr.appendChild(td)
			}
			tbdy.appendChild(tr);
		}
		tbl.appendChild(tbdy);
		body.appendChild(tbl);

		var thead = document.createElement('thead'); // create element for header
		tbl.appendChild(thead); // append head to table
		for (var k = 0; k < headerVals.length; k++) { // append elements to header
			thead.appendChild(document.createElement("th")).appendChild(document.createTextNode(headerVals[k]));
		}
	}
	
	/*
	 *	setTable()
	 *
	 *	Sets the truth table to the 2-D array passed to it.
	 */
	function setTable(values) {
		if (visible == false) return;
		
		var myTable = document.getElementById("table" + suffix); // grab the table by ID
		for (var i = 0; i < rows; i++) { // for all rows
			for (var j = 0; j < cols; j++) { // for all columns
				//set table values
				myTable.rows[i].cells[j].innerHTML = values[i][j]; // make the cell value equal to 2-D array value
				//set alignment
				myTable.rows[i].cells[j].align = 'center'; // center the text
			}
		}
	}

	function highlightRow(row) {
		if (visible == false) return;
		var flag = true;
		var i;
		var myTable = document.getElementById("table" + suffix);
		
		for (i = 0; i < rows; i++) {
			for (var j = 0; j < cols; j++) {
				myTable.rows[i].cells[j].innerHTML = myTable.rows[i].cells[j].textContent;
			}
		}
		for (i = 0; i < rows; i++) {
			flag = true;
			for (var j = 0; j < cols - numOut; j++) {
				myTable.rows[i].cells[j].innerHTML = myTable.rows[i].cells[j].textContent;
				if (myTable.rows[i].cells[j].innerHTML != row[j]) {
					flag = false;
				}
			}
			if (flag == true)
				break;
		}
		if (i == rows) { return; }
		for (var j = 0; j < cols; j++) {
			myTable.rows[i].cells[j].innerHTML = "<font color = 'red'>" + myTable.rows[i].cells[j].innerHTML + "</font>";
		}
	}

	function highlightFirstRow() {
		if (visible == false) return;
		
		var myTable = document.getElementById('table' + suffix); // grab the table by ID
		for (var i = 0; i < cols; i++)
			myTable.rows[0].cells[i].innerHTML = "<font color = 'red'>" + myTable.rows[0].cells[i].innerHTML + "</font>";
	}
	
	function getTableWidth() { return document.getElementById("table" + suffix).offsetWidth; }
	
	function setTableOffset(num) { document.getElementById("table" + suffix).style.marginLeft=num + "px"; }
	
	function showTruthTable(bool) { visible = bool; }
}
