

function State(prevState, voidRow, voidCol) {

	this.parent = prevState;
	this.grid;
	this.voidPos = {row: voidRow, col: voidCol};

	this.gCost;
	this.hCost;
	this.fCost;

	// set up grid based on parent's grid and arguments for new void position
	this.configureGrid = function() {

		if (this.parent != undefined) {
			this.grid = gridCopy(this.parent.grid);

			// make swap
			if (this.parent.voidPos.row != voidRow || this.parent.voidPos.col != voidCol) {
				this.grid[this.parent.voidPos.row][this.parent.voidPos.col] = this.grid[voidRow][voidCol];
				this.grid[voidRow][voidCol] = 0;
			}
		}
	}

	this.configureGrid();	

	this.calcHCost = function() {

	}

	this.getIndivHCost = function(r, c, vR, vC) {
		return Math.abs(vR - r) + Math.abs(vC - c);
	}

	this.calcGCost = function(parent) {
		this.gCost = parent.gCost + 1;
	}

	this.calcFCost = function() {
		this.fCost = this.gCost + this.hCost;
	}

	// return array of all possible child states
	this.getAllPossibleTransitions = function() {
		var possible = [];

		// substitution for cleaner syntax
		var vR = this.voidPos.row;
		var vC = this.voidPos.col;

		// up and down moves
		for (var r = vR - 1; r <= vR + 1; r++) {
			if (this.grid[r] != undefined && r != vR) {
				possible.push(new State(this, r, vC));
			}
		}

		// left and right moves
		for (var c = vC - 1; c <= vC + 1; c++) {
			if (this.grid[vR][c] != undefined && c != vC) {
				possible.push(new State(this, vR, c));
			}
		}

		return possible;

	}
}