

function State(prevState, voidRow, voidCol) {

	this.parent = prevState;
	this.grid;
	this.voidPos = {row: voidRow, col: voidCol};

	this.configureGrid();

	this.gCost;
	this.hCost;
	this.fCost;

	// set up grid based on parent's grid and arguments for new void position
	this.configureGrid = function() {
		this.grid = gridCopy(this.parent.grid);

		// make swap
		if (this.parent.voidPos.row != voidRow || this.parent.voidPos.col != voidCol) {
			this.grid[this.parent.voidPos.row][this.parent.voidPos.col] = this.grid[voidRow][voidCol];
			this.grid[voidRow][voidCol] = 0;
		}
	}

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

	this.getAllPossibleTransitions = function() {

	}
}